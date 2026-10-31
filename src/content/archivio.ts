/**
 * Immagini d'archivio usate sul sito: tutte di pubblico dominio, con fonte e licenza.
 * Mostrano il territorio e i mestieri, mai lavori o clienti di Manuel.
 * I crediti compaiono nel footer di ogni pagina (componente ArchiveCredits).
 */
import curtiMercato from '../assets/archivio/curti-mercato.jpg';
import curtiTessitori from '../assets/archivio/curti-tessitori.jpg';
import mitelliBologna from '../assets/archivio/mitelli-bologna.jpg';
import persiceto1838 from '../assets/archivio/persiceto-1838.jpg';

export const archivio = {
  curtiMercato: {
    src: curtiMercato,
    alt: 'Acquaforte del Seicento: una piazza di Bologna con venditori, ceste, botti e un asino carico.',
    didascalia: 'Venditori al mercato di Bologna. Francesco Curti, «Virtù ed Arti Esercitate in Bologna», circa 1650.',
    credito: 'Francesco Curti, tavola 5 di «Virtù ed Arti Esercitate in Bologna», ca. 1650. The Metropolitan Museum of Art, pubblico dominio (CC0).',
    fonte: 'https://www.metmuseum.org/art/collection/search/855543',
  },
  curtiTessitori: {
    src: curtiTessitori,
    alt: 'Acquaforte del Seicento: tessitrici al telaio, un uomo con una cesta sulla testa e venditori di vasi in un porticato.',
    didascalia: 'Tessitori e venditori. Francesco Curti, «Virtù ed Arti Esercitate in Bologna», circa 1650.',
    credito: 'Francesco Curti, tavola 14 di «Virtù ed Arti Esercitate in Bologna», ca. 1650. The Metropolitan Museum of Art, pubblico dominio (CC0).',
    fonte: 'https://www.metmuseum.org/art/collection/search/855562',
  },
  mitelliBologna: {
    src: mitelliBologna,
    alt: 'Frontespizio inciso del 1660 con una dedica in corsivo e, in basso, la veduta di Bologna con le sue torri.',
    didascalia: 'Bologna e le sue torri. Giuseppe Maria Mitelli, frontespizio di «Di Bologna l’Arti per via», 1660.',
    credito: 'Giuseppe Maria Mitelli, frontespizio di «Di Bologna l’Arti per via d’Annibal Caracci», 1660. The Metropolitan Museum of Art, pubblico dominio (CC0).',
    fonte: 'https://www.metmuseum.org/art/collection/search/629687',
  },
  persiceto1838: {
    src: persiceto1838,
    alt: 'Pagina a stampa con un’iscrizione latina del 1838 che conferisce a San Giovanni in Persiceto il titolo di città.',
    didascalia: '1838: Persiceto riceve il titolo di città, anche «per l’opportunità ai commerci». Iscrizione da Carlo Monti, «Storia della città di S. Giovanni in Persiceto».',
    credito: 'Carlo Monti, «Storia della città di S. Giovanni in Persiceto nei dominii della Santa Sede», 1838. Biblioteca Nazionale Centrale di Firenze via Internet Archive, pubblico dominio.',
    fonte: 'https://archive.org/details/bub_gb_p7dLejl-imQC',
  },
} as const;

export type ArchivioId = keyof typeof archivio;

/** Altri materiali di terzi usati nel sito (non immagini visibili). */
export const altriCrediti = [
  { credito: 'Illuminazione 3D: «Studio Small 09» di Sergej Majboroda, Poly Haven, CC0.', fonte: 'https://polyhaven.com/a/studio_small_09' },
];
