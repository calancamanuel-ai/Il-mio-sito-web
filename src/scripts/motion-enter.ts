/**
 * Entrate delle sezioni: una volta sola, quando la sezione entra. Il modo cambia con il contenuto
 * (mai la stessa dissolvenza ovunque): i titoli salgono, le immagini e i frammenti d'interfaccia
 * si aprono dall'alto, gli elenchi arrivano uno dopo l'altro. Le sezioni già visibili
 * al caricamento non si toccano, e nemmeno quelle con una scena propria (data-scene).
 * Solo opacità e trasformazioni: niente visibility:hidden, così i lettori di schermo leggono
 * sempre tutto, anche le sezioni non ancora animate.
 */
import { gsap } from 'gsap';

const PICTURES = 'figure, .frag, .mock, [data-ui]:not(.switch):not(.strip)';
const LISTS = 'ol > li, ul.claims-list > li, .qa, .use-list > li, .principles > li, .entry, .claim';

export function enterSections() {
  const sections = [...document.querySelectorAll<HTMLElement>('main section, main .section')]
    .filter((s, i, all) => all.indexOf(s) === i && !s.closest('[data-scene]') && !s.matches('[data-scene]'));
  for (const s of sections) {
    if (s.getBoundingClientRect().top < innerHeight * 0.85) continue; // già sullo schermo: niente da animare
    const heading = s.querySelector(':scope > h2, :scope > h1, :scope h2.section-title, .faq-title, .price-sentence');
    const pictures = [...s.querySelectorAll<HTMLElement>(PICTURES)].filter((el) => !el.parentElement?.closest(PICTURES));
    const items = [...s.querySelectorAll<HTMLElement>(LISTS)].filter((el) => !pictures.some((p) => p.contains(el)));
    const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: 'top 80%', once: true }, defaults: { ease: 'power2.out' } });
    if (heading) tl.from(heading, { y: 28, opacity: 0, duration: 0.8 });
    if (items.length) tl.from(items.slice(0, 12), { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, heading ? '<0.12' : 0);
    if (pictures.length) tl.from(pictures, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut', stagger: 0.12, clearProps: 'clipPath' }, heading ? '<0.08' : 0);
  }
}
