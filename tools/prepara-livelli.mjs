// Prepara i livelli della prova /lab/hero-livelli dalle immagini generate con Gemini.
// Uso: node tools/prepara-livelli.mjs [cartella-ingresso=riferimenti/livelli] [cartella-uscita=public/livelli]
//
// Nomi attesi in ingresso (png, jpg o webp; gli altri file sono ignorati):
//   sfondo-computer.*  sfondo-telefono.*   -> sfondo pieno, nessuna scontornatura
//   primo-piano.*                           -> scontornato
//   oggetto-email.* oggetto-whatsapp.* oggetto-pdf.* oggetto-foglio.* oggetto-postit.* oggetto-scontrino.*
//
// Per ogni immagine scontornata:
//   1. colore di sfondo: letto dai bordi (il più frequente), così va bene magenta, verde o un altro colore uniforme
//   2. trasparenza morbida in base alla distanza dal colore di sfondo (niente scalini sui bordi)
//   3. pulizia dei bordi: tolgo il riflesso del colore di sfondo dai pixel semitrasparenti,
//      stringo il bordo di 1 px e cancello i puntini isolati (rumore della compressione)
//   4. ritaglio sul contenuto, con 4 px di margine
// Poi versioni "telefono" e "computer" in AVIF e WebP, dentro il budget:
//   telefono < 600 KB in tutto, computer < 1,5 MB in tutto (per formato: il browser ne scarica uno).
// Se si sfora, abbasso la qualità a passi fino a rientrare. Scrive src/content/livelli.json
// e un foglio di controllo su scacchiera in riferimenti/livelli/controllo.png.
import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const [inDir = 'riferimenti/livelli', outDir = 'public/livelli'] = process.argv.slice(2);
const manifestPath = 'src/content/livelli.json';
const publicBase = '/' + outDir.replace(/^public\/?/, '').replace(/\/$/, '');
const BUDGET = { telefono: 600 * 1024, computer: 1.5 * 1024 * 1024 };

// larghezza massima per versione (mai ingrandita oltre l'originale)
const SIZES = {
  sfondo: { computer: 1920, telefono: 900 },
  'primo-piano': { computer: 1920, telefono: 1000 },
  oggetto: { computer: 380, telefono: 240 },
};

const files = existsSync(inDir) ? readdirSync(inDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)) : [];
const pick = (base) => files.find((f) => parse(f).name.toLowerCase() === base);

/** Scontorna: restituisce { data (RGBA), width, height } già ritagliato. */
async function keyOut(file) {
  const { data: src, info } = await sharp(join(inDir, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = (x, y) => (y * w + x) * 3;

  // 1. colore di sfondo dai bordi
  const border = [];
  for (let x = 0; x < w; x += 2) border.push(px(x, 0), px(x, h - 1));
  for (let y = 0; y < h; y += 2) border.push(px(0, y), px(w - 1, y));
  // colore più frequente sul bordo (a gruppi di 16 livelli), non la mediana: nel primo piano il banco
  // tocca tre lati su quattro, ma è scuro e variegato, mentre il fondo è uniforme e vince comunque
  const buckets = new Map();
  for (const i of border) {
    const k = (src[i] >> 4) * 256 + (src[i + 1] >> 4) * 16 + (src[i + 2] >> 4);
    const b = buckets.get(k) ?? { n: 0, r: 0, g: 0, b: 0 };
    b.n++; b.r += src[i]; b.g += src[i + 1]; b.b += src[i + 2];
    buckets.set(k, b);
  }
  const mode = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  const key = [mode.r / mode.n, mode.g / mode.n, mode.b / mode.n].map(Math.round);

  // 2. trasparenza: distanza nel piano del colore (meno sensibile alla luminosità) + distanza RGB
  const alpha = new Float32Array(w * h);
  const T0 = 38, T1 = 120; // sotto T0 è sfondo, sopra T1 è soggetto
  for (let i = 0, p = 0; i < w * h; i++, p += 3) {
    const dr = src[p] - key[0], dg = src[p + 1] - key[1], db = src[p + 2] - key[2];
    const d = Math.sqrt(dr * dr + dg * dg + db * db);
    const s = Math.min(1, Math.max(0, (d - T0) / (T1 - T0)));
    alpha[i] = s * s * (3 - 2 * s);
  }

  // 3a. stringo il bordo di 1 px (minimo nel vicinato 3x3): via l'alone della compressione
  const er = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let m = 1;
    for (let yy = Math.max(0, y - 1); yy <= Math.min(h - 1, y + 1); yy++)
      for (let xx = Math.max(0, x - 1); xx <= Math.min(w - 1, x + 1); xx++) m = Math.min(m, alpha[yy * w + xx]);
    er[y * w + x] = (m + alpha[y * w + x]) / 2; // metà strada: bordo più netto ma non mangiato
  }

  // 3b. puntini isolati: tengo solo le zone grandi almeno lo 0,2% della più grande
  const lab = new Int32Array(w * h).fill(-1);
  const sizes = [];
  for (let i = 0; i < w * h; i++) {
    if (er[i] < 0.5 || lab[i] >= 0) continue;
    const id = sizes.length; let n = 0; const stack = [i]; lab[i] = id;
    while (stack.length) {
      const j = stack.pop(); n++;
      const x = j % w, y = (j / w) | 0;
      for (const k of [x > 0 ? j - 1 : -1, x < w - 1 ? j + 1 : -1, y > 0 ? j - w : -1, y < h - 1 ? j + w : -1])
        if (k >= 0 && lab[k] < 0 && er[k] >= 0.5) { lab[k] = id; stack.push(k); }
    }
    sizes.push(n);
  }
  const keep = Math.max(...sizes, 1) * 0.002;
  // i pixel semitrasparenti seguono la zona solida più vicina (vicinato 5x5)
  const solidOk = (i) => lab[i] >= 0 && sizes[lab[i]] >= keep;
  // pixel entro 3 px da una zona di sfondo (alpha < 0,5)
  const bgMask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) bgMask[i] = er[i] < 0.5 ? 1 : 0;
  const nearBg = (x, y) => {
    for (let yy = Math.max(0, y - 3); yy <= Math.min(h - 1, y + 3); yy++)
      for (let xx = Math.max(0, x - 3); xx <= Math.min(w - 1, x + 3); xx++) if (bgMask[yy * w + xx]) return true;
    return false;
  };
  const out = Buffer.alloc(w * h * 4);
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    let a = er[i];
    if (a > 0) {
      let ok = false;
      for (let yy = Math.max(0, y - 2); yy <= Math.min(h - 1, y + 2) && !ok; yy++)
        for (let xx = Math.max(0, x - 2); xx <= Math.min(w - 1, x + 2) && !ok; xx++) ok = solidOk(yy * w + xx);
      if (!ok) a = 0;
    }
    // 3c. tolgo il colore di sfondo mescolato nei bordi: c = (osservato - (1 - a) * sfondo) / a
    const p = i * 3, o = i * 4;
    for (let c = 0; c < 3; c++) {
      const v = a > 0.02 ? (src[p + c] - (1 - a) * key[c]) / a : 0;
      out[o + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    // 3d. vicino al bordo (entro 3 px dallo sfondo) tolgo anche il riflesso residuo del colore di sfondo:
    // per un fondo magenta, rosso e blu che superano il verde. Più all'interno i colori restano intatti.
    if (a > 0 && nearBg(x, y)) {
      const hi = [0, 1, 2].filter((c) => key[c] > 128), lo = [0, 1, 2].filter((c) => key[c] <= 128);
      if (hi.length && lo.length) {
        const spill = Math.min(...hi.map((c) => out[o + c])) - Math.max(...lo.map((c) => out[o + c]));
        if (spill > 0) hi.forEach((c) => { out[o + c] -= spill; });
      }
    }
    out[o + 3] = Math.round(a * 255);
    if (a > 0.04) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  }
  if (x1 < 0) throw new Error(`${file}: non trovo il soggetto (sfondo non uniforme?)`);

  // 4. ritaglio con 4 px di margine
  const m = 4;
  const left = Math.max(0, x0 - m), top = Math.max(0, y0 - m);
  const cw = Math.min(w, x1 + m + 1) - left, ch = Math.min(h, y1 + m + 1) - top;
  const data = await sharp(out, { raw: { width: w, height: h, channels: 4 } }).extract({ left, top, width: cw, height: ch }).raw().toBuffer();
  return { data, width: cw, height: ch, key };
}

const jobs = [];
for (const [name, files2] of [['sfondo', { computer: 'sfondo-computer', telefono: 'sfondo-telefono' }]]) {
  const pc = pick(files2.computer), tel = pick(files2.telefono) ?? pc;
  if (pc || tel) jobs.push({ name, kind: 'sfondo', src: { computer: pc ?? tel, telefono: tel } });
}
if (pick('primo-piano')) jobs.push({ name: 'primo-piano', kind: 'primo-piano', src: { computer: pick('primo-piano'), telefono: pick('primo-piano') } });
for (const k of ['email', 'whatsapp', 'pdf', 'foglio', 'postit', 'scontrino']) {
  const f = pick(`oggetto-${k}`);
  if (f) jobs.push({ name: k, kind: 'oggetto', src: { computer: f, telefono: f } });
}
if (!jobs.length) {
  console.log(`Nessuna immagine in ${inDir}: la pagina usa i segnaposto disegnati.`);
  process.exit(0);
}

// sorgenti preparate una volta sola
const prepared = new Map();
async function source(job, file) {
  const id = `${job.kind}:${file}`;
  if (!prepared.has(id)) {
    if (job.kind === 'sfondo') {
      const { data, info } = await sharp(join(inDir, file)).removeAlpha().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      prepared.set(id, { data, width: info.width, height: info.height, opaque: true });
    } else prepared.set(id, await keyOut(file));
  }
  return prepared.get(id);
}

async function encodeAll(q) {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const manifest = {}; const totals = { telefono: { avif: 0, webp: 0 }, computer: { avif: 0, webp: 0 } };
  for (const job of jobs) {
    manifest[job.name] = {};
    for (const ver of ['computer', 'telefono']) {
      const s = await source(job, job.src[ver]);
      const width = Math.min(s.width, SIZES[job.kind][ver]);
      const img = () => sharp(s.data, { raw: { width: s.width, height: s.height, channels: 4 } }).resize({ width, kernel: 'lanczos3' });
      const base = `${job.name}-${ver}`;
      const avif = await img().avif({ quality: q.avif, effort: 6 }).toBuffer();
      const webp = await img().webp({ quality: q.webp, alphaQuality: 90, effort: 6, smartSubsample: true }).toBuffer();
      writeFileSync(join(outDir, `${base}.avif`), avif);
      writeFileSync(join(outDir, `${base}.webp`), webp);
      const height = Math.round((s.height * width) / s.width);
      manifest[job.name][ver] = { w: width, h: height, avif: `${publicBase}/${base}.avif`, webp: `${publicBase}/${base}.webp`, kb: { avif: Math.round(avif.length / 1024), webp: Math.round(webp.length / 1024) } };
      // un oggetto compare più volte nella pagina ma si scarica una volta sola
      totals[ver].avif += avif.length; totals[ver].webp += webp.length;
    }
  }
  return { manifest, totals };
}

let q = { avif: 55, webp: 80 };
let res;
for (;;) {
  res = await encodeAll(q);
  const over = ['telefono', 'computer'].filter((v) => Math.max(res.totals[v].avif, res.totals[v].webp) > BUDGET[v]);
  if (!over.length || q.webp <= 40) break;
  q = { avif: q.avif - 6, webp: q.webp - 8 };
  console.log(`Sopra il budget (${over.join(', ')}): riprovo con qualità AVIF ${q.avif}, WebP ${q.webp}`);
}

writeFileSync(manifestPath, JSON.stringify({ nota: 'Generato da tools/prepara-livelli.mjs: non modificare a mano.', qualita: q, livelli: res.manifest }, null, 2) + '\n');

// foglio di controllo: ogni scontornato su scacchiera, per vedere i bordi
const cut = [...prepared.values()].filter((p) => !p.opaque);
if (cut.length) {
  const cell = 320;
  const tiles = await Promise.all(cut.map(async (p) => {
    const sq = 16, board = Buffer.alloc(cell * cell * 3);
    for (let y = 0; y < cell; y++) for (let x = 0; x < cell; x++) board.fill(((x / sq | 0) + (y / sq | 0)) % 2 ? 90 : 160, (y * cell + x) * 3, (y * cell + x) * 3 + 3);
    const fg = await sharp(p.data, { raw: { width: p.width, height: p.height, channels: 4 } }).resize(cell - 20, cell - 20, { fit: 'inside' }).png().toBuffer();
    return sharp(board, { raw: { width: cell, height: cell, channels: 3 } }).composite([{ input: fg, gravity: 'center' }]).png().toBuffer();
  }));
  await sharp({ create: { width: cell * tiles.length, height: cell, channels: 3, background: '#000' } })
    .composite(tiles.map((input, i) => ({ input, left: i * cell, top: 0 }))).png().toFile(join(inDir, 'controllo.png'));
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`\nQualità finale: AVIF ${q.avif}, WebP ${q.webp}`);
for (const [name, v] of Object.entries(res.manifest))
  console.log(`${name.padEnd(12)} computer ${v.computer.w}x${v.computer.h} ${v.computer.kb.avif}/${v.computer.kb.webp} KB · telefono ${v.telefono.w}x${v.telefono.h} ${v.telefono.kb.avif}/${v.telefono.kb.webp} KB (avif/webp)`);
for (const ver of ['telefono', 'computer']) {
  const t = res.totals[ver];
  console.log(`Totale ${ver}: AVIF ${kb(t.avif)}, WebP ${kb(t.webp)} (budget ${kb(BUDGET[ver])}) ${Math.max(t.avif, t.webp) <= BUDGET[ver] ? 'OK' : 'SOPRA IL BUDGET'}`);
}
console.log(`Manifest: ${manifestPath}${cut.length ? ` · controllo bordi: ${join(inDir, 'controllo.png')}` : ''}`);
