/**
 * Livello di movimento del sito (fase 4). Si carica DOPO il primo disegno, solo se il movimento
 * non è ridotto (vedi BaseLayout): titolo e pulsanti sono già visibili e usabili senza.
 * GSAP 3.15 + ScrollTrigger; Lenis 1.3.27 solo su desktop con mouse (rotella più fluida).
 * Regola: gli stati nascosti di partenza li imposta solo questo script, mai il CSS.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enterSections } from './motion-enter';
import { machinePin, flowLine, mondayScene, circuitMap, workflowDots, deviceTilt } from './motion-scenes';

export async function startMotion() {
  const root = document.documentElement;
  if (root.classList.contains('motion')) return;
  root.classList.add('motion');
  gsap.registerPlugin(ScrollTrigger);

  if (matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ autoRaf: false, anchors: { offset: -96 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    // pannelli con scorrimento interno (menu, Contattami) restano nativi
    document.querySelectorAll('.panel, .nav-mobile nav').forEach((el) => el.setAttribute('data-lenis-prevent', ''));
  }

  // dall'alto in basso, nell'ordine della pagina
  machinePin();
  flowLine();
  mondayScene();
  circuitMap();
  workflowDots();
  deviceTilt();
  enterSections();

  // font e immagini lazy possono cambiare le altezze: ricalcolo
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true }));
}
