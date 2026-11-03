/**
 * Motore del riordino (un solo canvas 2D). L'ufficio nel caos si scompone in caratteri, che
 * piovono, entrano nel circuito, attraversano i quattro nodi e si ricompongono nell'ufficio in ordine.
 *
 * Tecnica:
 * - le due immagini (stessa inquadratura, 1024 px) si riducono a una griglia di celle: ogni pixel
 *   della griglia ridotta è il colore medio della sua cella;
 * - ogni cella non vuota diventa un carattere preso dai frammenti d'ufficio, colorato come la cella;
 * - i colori sono ridotti a una tavolozza (k-means) e i caratteri sono pre-disegnati una volta in un
 *   atlante, alone compreso: a ogni fotogramma si copiano solo dei rettangoli (drawImage);
 * - ogni carattere ha una cella di destinazione nell'ufficio in ordine, scelta per luminosità simile;
 * - tutte le posizioni sono funzioni di p (0..1, dallo scroll): tornando su la scena si rifà al contrario.
 * Ridisegna solo quando p cambia (più un leggero tremolio a p = 0); fermo fuori schermo e a scheda nascosta.
 */
import { frammenti, percorso, nodi, type Pt } from './riordino-dati';

export interface Riordino {
  setProgress(p: number): void;
  dispose(): void;
}
interface Opts {
  canvas: HTMLCanvasElement;
  caos: HTMLImageElement;
  ordine: HTMLImageElement;
  phone: boolean;
  onNodes?: (lit: boolean[]) => void;
}

const BG = [11, 18, 32];
const C01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => t * t * (3 - 2 * t);
const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Colori medi delle celle: l'immagine ridotta a cols x cols. */
function sample(img: HTMLImageElement, cols: number): Uint8ClampedArray {
  const c = document.createElement('canvas');
  c.width = c.height = cols;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  x.imageSmoothingQuality = 'high';
  x.drawImage(img, 0, 0, cols, cols);
  return x.getImageData(0, 0, cols, cols).data;
}

/** Tavolozza ridotta con k-means (poche iterazioni bastano). */
function palette(colors: number[][], k: number): number[][] {
  const r = rng(11);
  let cent = Array.from({ length: k }, () => colors[(r() * colors.length) | 0].slice());
  for (let it = 0; it < 8; it++) {
    const sum = cent.map(() => [0, 0, 0, 0]);
    for (const c of colors) {
      let best = 0, bd = Infinity;
      for (let j = 0; j < k; j++) { const d = (c[0] - cent[j][0]) ** 2 + (c[1] - cent[j][1]) ** 2 + (c[2] - cent[j][2]) ** 2; if (d < bd) { bd = d; best = j; } }
      const s = sum[best]; s[0] += c[0]; s[1] += c[1]; s[2] += c[2]; s[3]++;
    }
    cent = cent.map((c, j) => (sum[j][3] ? [sum[j][0] / sum[j][3], sum[j][1] / sum[j][3], sum[j][2] / sum[j][3]] : c));
  }
  return cent;
}
const nearest = (c: number[], pal: number[][]) => {
  let best = 0, bd = Infinity;
  for (let j = 0; j < pal.length; j++) { const d = (c[0] - pal[j][0]) ** 2 + (c[1] - pal[j][1]) ** 2 + (c[2] - pal[j][2]) ** 2; if (d < bd) { bd = d; best = j; } }
  return best;
};

export async function createRiordino(o: Opts): Promise<Riordino> {
  const { canvas, caos, ordine, phone } = o;
  await Promise.all([caos.decode().catch(() => {}), ordine.decode().catch(() => {})]);
  await document.fonts.load('16px "Geist Mono Variable"').catch(() => {});
  const ctx = canvas.getContext('2d')!;

  // --- griglia e caratteri ---
  const S = canvas.clientWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2);
  const W = Math.round(S * dpr);
  canvas.width = canvas.height = W;
  const cols = phone ? 36 : Math.max(44, Math.min(64, Math.round(S / 9.5)));
  const cell = W / cols;
  const a = sample(caos, cols), b = sample(ordine, cols);
  const isBg = (d: Uint8ClampedArray, i: number) => Math.abs(d[i] - BG[0]) + Math.abs(d[i + 1] - BG[1]) + Math.abs(d[i + 2] - BG[2]) < 30;
  const cells: number[] = [];
  for (let i = 0; i < cols * cols; i++) if (!isBg(a, i * 4) || !isBg(b, i * 4)) cells.push(i);
  const N = cells.length;

  const pal = palette(cells.flatMap((i) => [[a[i * 4], a[i * 4 + 1], a[i * 4 + 2]], [b[i * 4], b[i * 4 + 1], b[i * 4 + 2]]]), phone ? 14 : 20);
  const NP = pal.length;
  // versione schiarita di ogni colore per la pioggia: i caratteri devono leggersi sul fondo scuro
  for (let j = 0; j < NP; j++) pal.push(pal[j].map((v, k) => v + ([203, 213, 225][k] - v) * 0.5));
  pal.push([147, 197, 253]); // caratteri sul circuito: blu chiaro
  const CIRC = pal.length - 1;

  const testo = frammenti.join(' · ').replace(/ /g, '·');
  const chars = [...new Set(testo)];
  const charIdx = new Map(chars.map((c, i) => [c, i]));

  // atlante: una riga per colore, una colonna per carattere, alone già disegnato
  const pad = Math.ceil(2.5 * dpr);
  const T = Math.ceil(cell) + pad * 2;
  const atlas = document.createElement('canvas');
  atlas.width = T * chars.length; atlas.height = T * pal.length;
  const ax = atlas.getContext('2d')!;
  ax.font = `${Math.round(cell * 0.95)}px "Geist Mono Variable", ui-monospace, monospace`;
  ax.textAlign = 'center'; ax.textBaseline = 'middle';
  pal.forEach((c, r) => {
    const col = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
    ax.fillStyle = col; ax.shadowColor = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},0.55)`; ax.shadowBlur = 3 * dpr;
    chars.forEach((ch, k) => ax.fillText(ch, k * T + T / 2, r * T + T / 2));
  });

  // --- caratteri: casa (caos), destinazione (ordine), tempi ---
  const R = rng(7);
  const hx = new Float32Array(N), hy = new Float32Array(N), tx = new Float32Array(N), ty = new Float32Array(N);
  const det = new Float32Array(N), vel = new Float32Array(N), ent = new Float32Array(N), lane = new Float32Array(N);
  const c0 = new Uint8Array(N), c1 = new Uint8Array(N), ch = new Uint16Array(N), flick = new Uint8Array(N);
  const key = (d: Uint8ClampedArray, i: number) => Math.round(lum(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]) / 32) * 1000 + (i % cols);
  const src = cells.map((c, k) => ({ c, k, v: key(a, c) })).sort((p, q) => p.v - q.v);
  const dst = cells.map((c) => ({ c, v: key(b, c) })).sort((p, q) => p.v - q.v);
  src.forEach((s, r) => {
    const i = s.k, c = s.c, d = dst[r].c;
    hx[i] = ((c % cols) + 0.5) / cols; hy[i] = (((c / cols) | 0) + 0.5) / cols;
    tx[i] = ((d % cols) + 0.5) / cols; ty[i] = (((d / cols) | 0) + 0.5) / cols;
    c0[i] = nearest([a[c * 4], a[c * 4 + 1], a[c * 4 + 2]], pal.slice(0, NP));
    c1[i] = nearest([b[d * 4], b[d * 4 + 1], b[d * 4 + 2]], pal.slice(0, NP));
  });
  for (let i = 0; i < N; i++) {
    ch[i] = charIdx.get(testo[i % testo.length])!;
    det[i] = 0.18 * (0.75 * hy[i] + 0.25 * R()); // si staccano dall'alto, con un bordo irregolare
    vel[i] = 0.9 + R() * 1.1;
    ent[i] = 0.42 + 0.14 * R();
    lane[i] = (R() - 0.5) * 0.026;
    flick[i] = R() < 0.35 ? 1 : 0;
  }

  // --- percorso del circuito ---
  const segL = percorso.slice(1).map((q, i) => Math.hypot(q.x - percorso[i].x, q.y - percorso[i].y));
  const tot = segL.reduce((s, v) => s + v, 0);
  const cum = segL.reduce<number[]>((acc, v) => (acc.push(acc[acc.length - 1] + v / tot), acc), [0]);
  const nodeU = nodi.map((n) => cum[n.i]);
  const at = (u: number, out: Pt) => {
    let s = 0;
    while (s < segL.length - 1 && cum[s + 1] < u) s++;
    const k = (u - cum[s]) / (cum[s + 1] - cum[s] || 1);
    const p0 = percorso[s], p1 = percorso[s + 1];
    out.x = p0.x + (p1.x - p0.x) * k; out.y = p0.y + (p1.y - p0.y) * k;
    return [p1.x - p0.x, p1.y - p0.y];
  };
  const start = percorso[0], end = percorso[percorso.length - 1];

  // --- disegno ---
  let p = 0, want = 0, raf = 0, visible = true, lastLit = '';
  const q: Pt = { x: 0, y: 0 };
  const drawGlyph = (i: number, x: number, y: number, color: number, chi = ch[i]) => {
    ctx.drawImage(atlas, chi * T, color * T, T, T, Math.round(x * W - T / 2), Math.round(y * W - T / 2), T, T);
  };
  function circuit(litU: number) {
    const lw = Math.max(2, 2.5 * dpr);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.lineWidth = lw; ctx.strokeStyle = '#1e2a44';
    ctx.beginPath(); percorso.forEach((pt, k) => (k ? ctx.lineTo(pt.x * W, pt.y * W) : ctx.moveTo(pt.x * W, pt.y * W))); ctx.stroke();
    if (litU > 0) {
      ctx.strokeStyle = '#3b82f6'; ctx.beginPath(); ctx.moveTo(start.x * W, start.y * W);
      for (let k = 1; k < percorso.length && cum[k] <= litU; k++) ctx.lineTo(percorso[k].x * W, percorso[k].y * W);
      at(litU, q); ctx.lineTo(q.x * W, q.y * W); ctx.stroke();
    }
    const sz = 9 * dpr;
    nodi.forEach((n, k) => {
      const pt = percorso[n.i], on = litU >= nodeU[k];
      ctx.save();
      if (on) { ctx.shadowColor = 'rgba(34,211,238,0.7)'; ctx.shadowBlur = 10 * dpr; }
      ctx.fillStyle = on ? '#22d3ee' : '#1e2a44';
      ctx.fillRect(Math.round(pt.x * W - sz / 2), Math.round(pt.y * W - sz / 2), sz, sz);
      ctx.restore();
    });
  }
  function render() {
    raf = 0;
    p = want;
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, W);
    if (p <= 0) return idle();
    if (p >= 0.96) return; // a fine scena resta l'immagine vera (HTML), con le stanze toccabili sopra
    // 1. l'ufficio nel caos con i buchi delle celle già staccate
    if (p < 0.2) {
      ctx.drawImage(caos, 0, 0, W, W);
      for (let i = 0; i < N; i++) if (p >= det[i]) ctx.clearRect(Math.floor((hx[i] - 0.5 / cols) * W), Math.floor((hy[i] - 0.5 / cols) * W), Math.ceil(cell) + 1, Math.ceil(cell) + 1);
    }
    // 2. sagome lontane: il caos che sparisce, l'ordine che arriva
    const g0 = 0.14 * (1 - C01((p - 0.2) / 0.3)), g1 = 0.16 * C01((p - 0.55) / 0.25);
    if (p >= 0.2 && g0 > 0) { ctx.globalAlpha = g0; ctx.drawImage(caos, 0, 0, W, W); }
    if (g1 > 0) { ctx.globalAlpha = g1; ctx.drawImage(ordine, 0, 0, W, W); }
    ctx.globalAlpha = 1;
    // 3. circuito e nodi
    const litU = C01((p - 0.46) / 0.11);
    if (p > 0.3) { ctx.globalAlpha = C01((p - 0.3) / 0.1) * (1 - C01((p - 0.9) / 0.06)); circuit(litU); ctx.globalAlpha = 1; }
    const lit = nodeU.map((u) => litU >= u && p < 0.96);
    const s = lit.join();
    if (s !== lastLit) { lastLit = s; o.onNodes?.(lit); }
    // 4. i caratteri
    const fade = C01((p - 0.86) / 0.1);
    ctx.globalAlpha = 1 - fade;
    for (let i = 0; i < N; i++) {
      const d = det[i];
      if (p < d) continue;
      const e = ent[i];
      let x: number, y: number, color = c0[i] + NP, chi = ch[i];
      const rain = (t: number) => { x = hx[i]; y = (hy[i] + vel[i] * (t - d) * 1.6) % 1; };
      if (p < e) {
        rain(p);
        x! += Math.sin(i * 1.3 + p * 90) * 0.0016; // tremolio del caos
        if (flick[i]) chi = (ch[i] + ((p * 70 + i) | 0)) % chars.length;
      } else if (p < e + 0.04) {
        rain(e);
        const k = ease((p - e) / 0.04);
        x = x! + (start.x - x!) * k; y = y! + (start.y - y!) * k;
      } else if (p < e + 0.15) {
        const dir = at((p - e - 0.04) / 0.11, q);
        const len = Math.hypot(dir[0], dir[1]) || 1;
        x = q.x - (dir[1] / len) * lane[i]; y = q.y + (dir[0] / len) * lane[i];
        color = CIRC;
      } else if (p < e + 0.28) {
        const t = (p - e - 0.15) / 0.13, top = 0.05;
        if (t < 0.5) { const k = ease(t / 0.5); x = end.x + (tx[i] - end.x) * k; y = end.y + (top - end.y) * k; color = CIRC; }
        else { const k = (t - 0.5) / 0.5; x = tx[i]; y = top + (ty[i] - top) * k * k; color = c1[i]; }
      } else { x = tx[i]; y = ty[i]; color = c1[i]; }
      drawGlyph(i, x!, y!, color, chi);
    }
    // 5. l'ufficio in ordine prende il posto dei caratteri
    if (fade > 0) { ctx.globalAlpha = fade; ctx.drawImage(ordine, 0, 0, W, W); }
    ctx.globalAlpha = 1;
  }

  // tremolio a riposo (p = 0): pochi caratteri che compaiono sopra le carte, a 10 fotogrammi al secondo
  let idleT = 0, idleOn = false;
  const idleR = rng(3);
  const pool = Array.from({ length: phone ? 18 : 36 }, () => ({ i: (idleR() * N) | 0, life: 0 }));
  function idle() {
    if (!visible || document.hidden || want > 0) { idleOn = false; return; }
    idleOn = true;
    requestAnimationFrame((t) => {
      if (want > 0 || !visible) { idleOn = false; return; }
      if (t - idleT > 100) {
        idleT = t;
        ctx.clearRect(0, 0, W, W);
        for (const g of pool) {
          if (--g.life <= 0) { g.i = (idleR() * N) | 0; g.life = 4 + ((idleR() * 6) | 0); }
          drawGlyph(g.i, hx[g.i] + Math.sin(t / 90 + g.i) * 0.0012, hy[g.i], c0[g.i], (ch[g.i] + ((t / 260) | 0)) % chars.length);
        }
      }
      idleOn = false;
      idle();
    });
  }

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && want <= 0 && !idleOn) idle(); });
  io.observe(canvas);
  const onVis = () => { if (!document.hidden && visible && want <= 0 && !idleOn) idle(); };
  document.addEventListener('visibilitychange', onVis);
  idle();

  return {
    setProgress(v) {
      const n = C01(v);
      if (n === want) return;
      want = n;
      if (!raf) raf = requestAnimationFrame(render);
    },
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      want = -1;
    },
  };
}
