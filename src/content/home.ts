/**
 * Testi della home [BOZZA]: derivati dal piano in attesa di riferimenti/messaggi.md.
 * Condivisi dalle tre direzioni in /lab, così il confronto è solo di forma.
 */
import { prezzi } from '../config/sito';

export const macchina = 'Quanto tempo perdi in attività che un sistema farebbe da solo?';

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
    q: 'Posso usare i voucher digitali?',
    a: 'Le Camere di Commercio di Bologna e Modena pubblicano bandi per la digitalizzazione delle imprese. Edizione e scadenze 2026: ',
    segnaposto: '[DA COMPLETARE: verificare sul sito della CCIAA di Bologna e di Modena]',
    dopo: '. In call vediamo se il tuo progetto rientra.',
  },
];

export const chiusura = 'Venti minuti, poi decidi tu.';

/** Fiducia: onestà. Quando un'automazione non ripaga. */
export const nonConviene = {
  titolo: 'Quando non conviene automatizzare',
  intro: 'Te lo dico in call, prima di qualsiasi preventivo. Di solito non conviene quando:',
  casi: [
    { h: 'Succede due volte l’anno', p: 'Un’attività rara costa meno farla a mano che costruire e mantenere un flusso.' },
    { h: 'Il processo cambia ogni settimana', p: 'Prima va deciso come si lavora; automatizzare il caos lo rende solo più veloce.' },
    { h: 'Serve sempre il tuo giudizio', p: 'Se ogni caso è diverso, il sistema può preparare il lavoro, non farlo al posto tuo.' },
  ],
  invece: 'In questi casi ti propongo qualcosa di più semplice, anche solo un foglio fatto bene o un modello di email.',
};

/** Fiducia: trasparenza. Cosa succede dopo il primo contatto. */
export const dopoContatto = [
  { h: 'Rispondo', p: 'Ti scrivo io, entro ', tempo: true },
  { h: 'Ci sentiamo 20 minuti', p: 'In call o in video, a un orario che scegli tu.' },
  { h: 'Ricevi la proposta', p: 'Scritta, con un prezzo fisso e i tempi. Decidi con calma.' },
];
