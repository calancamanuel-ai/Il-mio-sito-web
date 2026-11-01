/**
 * Le scene allo scroll del sito. Ognuna parte solo se il suo elemento c'è nella pagina.
 * Home: macchina del flusso fissata (pin) + linea di flusso + lunedì mattina.
 * Chi sono: piste della mappa che si disegnano. Automazioni: impulsi negli schemi.
 * Siti web: il dispositivo che si raddrizza scorrendo.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type FlowEl = HTMLElement & { flow?: { setProgress(t: number): void } };
const phone = () => matchMedia('(max-width: 760px)').matches;
const hasGL = () => { try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; } };

/** La macchina del flusso resta ferma sullo schermo mentre lo scroll ne guida la coreografia (0 -> 1). */
export function machinePin() {
  const fm = document.querySelector<FlowEl>('#macchina-flusso');
  if (!fm || !hasGL()) return; // senza WebGL resta il fotogramma statico, niente pin
  const state = { p: Number(fm.dataset.progress || 0) };
  gsap.to(state, {
    p: 1,
    ease: 'none',
    onUpdate: () => { fm.dataset.progress = String(state.p); fm.flow?.setProgress(state.p); },
    scrollTrigger: {
      trigger: fm,
      start: 'center center',
      // sul telefono la tenuta è breve (circa una schermata): non si deve mai sentire bloccati
      end: () => (phone() ? '+=100%' : '+=160%'),
      pin: true,
      scrub: 0.4,
      invalidateOnRefresh: true,
    },
  });
  // quando il 3D sostituisce il fotogramma statico l'altezza cambia: ricalcolo le misure
  fm.addEventListener('flow:ready', () => ScrollTrigger.refresh(), { once: true });
}

/** La linea nel margine si riempie scorrendo; ogni sezione si "accende" quando la linea la raggiunge. */
export function flowLine() {
  const track = document.querySelector<HTMLElement>('[data-flow-track]');
  if (!track) return;
  const fill = track.querySelector<HTMLElement>('[data-flow-fill]');
  if (fill) {
    gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 70%', scrub: true } });
  }
  track.querySelectorAll<HTMLElement>(':scope > section').forEach((s) => {
    ScrollTrigger.create({
      trigger: s,
      start: 'top+=170 70%',
      onEnter: () => s.classList.add('is-lit'),
      onLeaveBack: () => s.classList.remove('is-lit'),
    });
  });
}

/** Il lunedì mattina: arrivando su ogni attività, il suo interruttore scatta da solo (una volta). */
export function mondayScene() {
  const scene = document.querySelector<HTMLElement>('[data-scene="lunedi"]');
  if (!scene) return;
  scene.querySelectorAll<HTMLElement>('.band').forEach((band, i) => {
    ScrollTrigger.create({
      trigger: band,
      start: 'center 62%',
      once: true,
      onEnter: () => {
        const sw = band.querySelector<HTMLButtonElement>('.switch');
        if (sw && sw.getAttribute('aria-checked') !== 'true') gsap.delayedCall(i === 0 ? 0.1 : 0, () => sw.click());
      },
    });
  });
}

/** Mappa a circuito: le piste partono da Persiceto e si disegnano una dopo l'altra. */
export function circuitMap() {
  const map = document.querySelector<HTMLElement>('[data-circuit-map]');
  if (!map) return;
  const tracks = map.querySelectorAll<SVGPathElement>('[data-track]');
  gsap.fromTo(tracks, { strokeDashoffset: 1 }, {
    strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.12,
    scrollTrigger: { trigger: map, start: 'top 75%', once: true },
  });
  gsap.from(map.querySelectorAll('[data-town]'), {
    scale: 0, transformOrigin: 'center', duration: 0.4, ease: 'back.out(2)', stagger: 0.08, delay: 0.3,
    scrollTrigger: { trigger: map, start: 'top 75%', once: true },
  });
}

/** Schemi dei flussi d'esempio: un impulso li percorre quando entrano nello schermo. */
export function workflowDots() {
  document.querySelectorAll<HTMLElement>('[data-chain]').forEach((chain) => {
    ScrollTrigger.create({ trigger: chain, start: 'top 80%', onEnter: () => chain.classList.add('is-live'), onLeaveBack: () => chain.classList.remove('is-live') });
  });
}

/** Siti web: il dispositivo arriva inclinato e si raddrizza mentre lo raggiungi. */
export function deviceTilt() {
  document.querySelectorAll<HTMLElement>('[data-device-body]').forEach((el) => {
    gsap.fromTo(el, { rotateX: 14, rotateY: -12, y: 30 }, {
      rotateX: 3, rotateY: -4, y: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: true },
    });
  });
}
