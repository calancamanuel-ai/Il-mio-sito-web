/**
 * Dati del riordino (fase B, /lab/riordino). Coordinate in frazioni dell'immagine quadrata (0..1),
 * misurate sull'ufficio in ordine (riferimenti/immagini/ufficio-ordine.png, 1024 px).
 * Testi [BOZZA]: frammenti d'esempio, nessun dato vero di clienti.
 */
export type Pt = { x: number; y: number };
const px = (x: number, y: number): Pt => ({ x: x / 1024, y: y / 1024 });

/** Frammenti del lavoro d'ufficio che diventano la pioggia (vedi docs/MOVIMENTO.md §6). */
export const frammenti = [
  'fattura n. 132', 'richiamami', 'preventivo urgente', 'RE: RE: ordine', 'scad. 30/11',
  '+39 3·· ··· ····', 'allegato mancante', 'sollecito', 'IBAN?', 'a che punto è?',
  'bozza_v3_DEF', 'conferma appuntamento', 'DDT 0451', 'pagato?', 'manca la firma',
  'ti giro la mail', 'chi ha l’ultima versione?', 'urgente!!', 'fattura n. 133', 'rispondi entro oggi',
];

/** Percorso del circuito, dall'ingresso della reception al bordo davanti della lastra. */
export const percorso: Pt[] = [
  px(690, 762), // ingresso
  px(545, 665), // ricevi
  px(530, 575),
  px(522, 482), // capisci
  px(378, 486), // archivia
  px(465, 600),
  px(730, 556), // avvisa
  px(690, 650),
  px(600, 780),
  px(512, 900), // uscita verso la pagina
];

/** I quattro nodi: indice del punto nel percorso ed etichetta. */
export const nodi = [
  { i: 1, label: 'Ricevi', lato: 'sotto' },
  { i: 3, label: 'Capisci', lato: 'sopra' },
  { i: 4, label: 'Archivia', lato: 'sinistra' },
  { i: 6, label: 'Avvisa', lato: 'sotto' },
];

/** Le stanze toccabili dell'ufficio in ordine. */
export const stanze = [
  { nome: 'Reception', dove: px(505, 760), href: '/automazioni', dopo: 'Telefono, email e WhatsApp in un posto solo, e ogni cliente riceve risposta subito.' },
  { nome: 'Commerciale', dove: px(535, 525), href: '/software', dopo: 'I preventivi arrivano in bozza: li rileggi, non li riscrivi.' },
  { nome: 'Amministrazione', dove: px(372, 400), href: '/automazioni', dopo: 'Fatture e documenti finiscono da soli nel posto giusto.' },
  { nome: 'Vetrina online', dove: px(298, 590), href: '/siti-web', dopo: 'Un sito che risponde anche quando l’ufficio è chiuso.' },
  { nome: 'Laboratorio', dove: px(768, 425), href: '/software', dopo: 'Strumenti su misura quando quelli pronti non bastano.' },
];
