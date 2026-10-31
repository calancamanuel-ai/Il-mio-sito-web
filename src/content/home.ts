/**
 * Testi della home [BOZZA]: derivati dal piano in attesa di riferimenti/messaggi.md.
 * Condivisi dalle tre direzioni in /lab, così il confronto è solo di forma.
 */
import { prezzi } from '../config/sito';

export const hero = {
  titolo: 'Il lavoro ripetitivo lo fa un sistema.',
  sottotitolo:
    'Automazioni n8n, software su misura con Claude e siti web per imprese, studi e professionisti. Si parte da Persiceto, Bologna e Modena; si lavora anche da remoto.',
};

/** Una mattina d'esempio: orari e minuti illustrativi, dichiarati come tali. */
export const lunedi = [
  { t: '08:05', prima: 'Ricopi nel foglio le richieste del weekend.', dopo: 'Arrivano già in tabella.', min: 40 },
  { t: '08:45', prima: 'Prepari tre preventivi partendo dal listino.', dopo: 'Trovi le bozze pronte da rileggere.', min: 55 },
  { t: '09:40', prima: 'Cerchi una fattura tra allegati e cartelle.', dopo: 'È già archiviata con il nome giusto.', min: 20 },
  { t: '10:10', prima: 'Mandi i promemoria degli appuntamenti.', dopo: 'Partono da soli il giorno prima.', min: 25 },
];

export const servizi = [
  { id: 'wf', h: 'Automazioni n8n', p: 'Richieste, fatture e promemoria passano da un flusso che lavora anche quando sei in cantiere o in udienza.' },
  { id: 'draft', h: 'Software su misura con Claude', p: 'Piccoli programmi che leggono le email, capiscono cosa chiede il cliente e preparano la bozza. Decidi sempre tu.' },
  { id: 'site', h: 'Siti web che portano contatti', p: 'Veloci sul telefono, chiari su cosa fai e collegati alle automazioni: la richiesta arriva già ordinata.' },
] as const;

export const passi = [
  { h: 'Call di 20 minuti', p: 'Mi racconti dove perdi tempo. Nessun impegno.' },
  { h: 'Analisi gratuita', p: 'Guardo come lavori e ti mando una proposta scritta con un prezzo fisso.' },
  { h: 'Prototipo', p: 'Vedi il flusso funzionare sui tuoi dati prima di decidere.' },
  { h: 'Consegna', p: 'Lo metto in funzione e ti spiego come controllarlo.' },
  { h: 'Supporto', p: 'Se qualcosa cambia, il flusso cambia con te.' },
];

export const faq: { q: string; a: string; segnaposto?: string; dopo?: string }[] = [
  { q: 'Quanto costa, alla fine?', a: `Dopo l'analisi gratuita ricevi un preventivo a prezzo fisso, che non cambia in corso d'opera. ${prezzi.fattoriPrezzo}` },
  { q: 'Devo cambiare i programmi che uso?', a: 'Quasi mai. Il flusso si collega a quello che hai già: email, fogli di calcolo, gestionale, WhatsApp.' },
  { q: 'Lavori solo nella zona di Bologna e Modena?', a: 'Si parte da qui, ma si lavora anche da remoto: call e consegne si fanno in video.' },
  {
    q: 'Posso usare i voucher digitali della Camera di Commercio?',
    a: 'Le Camere di Commercio pubblicano bandi per la digitalizzazione delle imprese. Edizione e scadenze 2026: ',
    segnaposto: '[DA COMPLETARE: verificare sul sito della CCIAA di Bologna e di Modena]',
    dopo: '. In call vediamo se il tuo progetto rientra.',
  },
];

export const chiusura = 'Venti minuti per capire cosa togliere dalla tua settimana.';
