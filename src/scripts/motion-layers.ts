/**
 * PROVA: coreografia della macchina del flusso a livelli (2.5D, senza WebGL).
 * Un solo valore 0..1 guidato dallo scroll, con le stesse tappe del 3D (flow-scene.ts):
 *   0.00  caos visibile, nodi spenti; la "camera" scorre lungo il flusso e i livelli si muovono
 *         a velocità diverse secondo la profondità (parallasse)
 *   0.40  i nodi si accendono uno alla volta, la linea si riempie
 *   0.60  gli oggetti entrano nella linea e la percorrono, rimpicciolendosi
 *   0.80  compaiono i risultati in ordine; il primo piano esce dal basso
 * Solo transform e opacity: niente layout a ogni fotogramma. Ridisegna solo quando qualcosa cambia.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chaos, layouts, flowPath, type Layout } from './layers-layout';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);
const tallMq = matchMedia('(max-width: 760px)');

export function layersScene(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const stage = root.querySelector<HTMLElement>('.ly-stage')!;
  const svg = stage.querySelector<SVGSVGElement>('.ly-line')!;
  const layer = (n: string) => stage.querySelector<HTMLElement>(`[data-layer="${n}"]`)!;
  const bg = layer('bg'), fg = layer('fg'), chain = layer('chain');
  const objs = [...stage.querySelectorAll<HTMLElement>('[data-obj]')];
  const nodeEls = [...stage.querySelectorAll<HTMLElement>('.ly-node')];
  const btns = [...stage.querySelectorAll<HTMLButtonElement>('[data-node]')];
  const outs = [...stage.querySelectorAll<HTMLElement>('.ly-out')];

  let t = 0, W = 1, H = 1, layout: Layout = 'wide';
  let rail: SVGPathElement, lit: SVGPathElement, len = 1;
  const ptr = { x: 0, y: 0 }, aim = { x: 0, y: 0 };
  let dirty = true, raf = 0;

  // la linea passa in coordinate in pixel: così il tratteggio (riempimento) e i punti lungo la curva sono esatti
  function measure() {
    W = stage.clientWidth; H = stage.clientHeight;
    layout = tallMq.matches ? 'tall' : 'wide';
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.removeAttribute('preserveAspectRatio');
    svg.querySelectorAll<SVGGElement>('[data-path]').forEach((g) => {
      const d = flowPath(g.dataset.path as Layout, W, H);
      g.querySelectorAll('path').forEach((p) => { p.setAttribute('d', d); p.style.vectorEffect = 'none'; });
    });
    const g = svg.querySelector<SVGGElement>(`[data-path="${layout}"]`)!;
    rail = g.querySelector<SVGPathElement>('.ly-rail')!;
    lit = g.querySelector<SVGPathElement>('.ly-lit')!;
    len = rail.getTotalLength();
    dirty = true;
  }

  function render() {
    const L = layouts[layout];
    const wide = layout === 'wide';
    // la "camera" scorre lungo il flusso: da sinistra a destra (o dall'alto in basso sul telefono)
    const cam = (t * 2 - 1) * (wide ? W * 0.035 : H * 0.025);
    const off = (d: number) => {
      const px = ptr.x * 14 * d, py = ptr.y * 8 * d;
      return wide ? [-cam * d + px, py] : [px, -cam * d + py];
    };
    const tr = (el: HTMLElement, [x, y]: number[], extra = '') => { el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)${extra}`; };

    tr(bg, off(0.15), ' scale(1.04)');
    tr(chain, off(1));
    const fgOut = ease(clamp01((t - 0.7) / 0.3));
    const [fx, fy] = off(1.6);
    tr(fg, [fx, fy + fgOut * H * 0.3]);

    lit.style.strokeDashoffset = String(1 - clamp01((t - 0.4) / 0.3));
    const sel = btns.findIndex((b) => b.getAttribute('aria-pressed') === 'true');
    nodeEls.forEach((n, i) => n.classList.toggle('is-on', t >= 0.4 + i * 0.075 || sel === i));
    outs.forEach((o, i) => {
      const s = ease(clamp01((t - 0.8 - i * 0.05) / 0.1));
      o.style.opacity = String(s);
      o.style.transform = `translate3d(0, ${((1 - s) * 14).toFixed(1)}px, 0)`;
    });

    const start = rail.getPointAtLength(0);
    const [cx, cy] = off(1);
    chaos.forEach((c, i) => {
      const el = objs[i];
      const p = c[layout];
      const hx = p.x * W, hy = p.y * H;
      const s = clamp01((t - 0.6 - i * 0.016) / 0.22);
      const lead = clamp01(s / 0.25), along = clamp01((s - 0.25) / 0.75);
      // nel caos ogni oggetto ondeggia e scivola secondo la sua profondità; entrando nella linea passa al piano dei nodi
      const depth = c.d + (1 - c.d) * ease(lead);
      const [ox, oy] = off(depth);
      const bob = Math.sin(t * 7 + i * 1.7) * 9 * c.d * (1 - lead);
      let x: number, y: number;
      if (along <= 0) {
        const k = ease(lead);
        x = hx + (start.x + cx - hx - ox) * k; y = hy + (start.y + cy - hy - oy) * k;
      } else {
        const q = rail.getPointAtLength(ease(along) * len);
        x = q.x + cx - ox; y = q.y + cy - oy;
      }
      const rot = p.r * (1 - lead);
      const sc = 1 - 0.55 * lead;
      el.style.transform = `translate3d(${(x - hx + ox).toFixed(1)}px, ${(y - hy + oy + bob).toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
      el.style.opacity = String(along > 0.88 ? clamp01((1 - along) / 0.12) : 1);
    });
  }

  function frame() {
    raf = 0;
    const moving = Math.abs(aim.x - ptr.x) > 0.002 || Math.abs(aim.y - ptr.y) > 0.002;
    if (moving) { ptr.x += (aim.x - ptr.x) * 0.08; ptr.y += (aim.y - ptr.y) * 0.08; }
    if (dirty || moving) { dirty = false; render(); }
    if (moving) kick();
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  measure();
  // gli stati di partenza li imposta lo script, mai il CSS: senza script resta il fotogramma completo
  stage.classList.add('is-live');
  render();

  new ResizeObserver(() => { measure(); kick(); }).observe(stage);
  root.addEventListener('layers:select', () => { dirty = true; kick(); });

  // parallasse col puntatore, solo con mouse e solo mentre la scena è a schermo
  if (matchMedia('(pointer: fine)').matches) {
    let inView = false;
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(stage);
    addEventListener('pointermove', (e) => {
      if (!inView) return;
      const r = stage.getBoundingClientRect();
      aim.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      aim.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    }, { passive: true });
  }

  // come il 3D: la scena resta ferma sullo schermo mentre lo scroll ne guida la coreografia
  const state = { p: 0 };
  gsap.to(state, {
    p: 1,
    ease: 'none',
    onUpdate: () => { t = state.p; dirty = true; kick(); },
    scrollTrigger: {
      trigger: root,
      start: 'center center',
      end: () => (tallMq.matches ? '+=100%' : '+=160%'),
      pin: true,
      scrub: 0.4,
      invalidateOnRefresh: true,
      // creata dopo le altre scene (si carica a parte): si ricalcola per prima, perché sta più in alto
      refreshPriority: 1,
    },
  });
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}
