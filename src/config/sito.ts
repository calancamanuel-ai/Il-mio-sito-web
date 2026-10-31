/**
 * Dati del sito: unico punto per segnaposto, contatti e prezzi.
 * Ogni valore "[DA COMPLETARE: ...]" è elencato in MANCANTI.md.
 */

export const DA_COMPLETARE = '[DA COMPLETARE:';

/** true se il valore è ancora un segnaposto. */
export function isPlaceholder(value: string | number | null | undefined): boolean {
  return typeof value === 'string' && value.startsWith(DA_COMPLETARE);
}

export const brand = {
  nome: '[DA COMPLETARE: nome del brand]',
  /** Nome della persona dietro il brand (dal piano). */
  titolare: 'Manuel',
  cognomeTitolare: '[DA COMPLETARE: cognome di Manuel]',
  ruolo: 'Consulente di automazione e sviluppo',
  promessa: 'Le attività ripetitive le fa un sistema, tu fai il tuo lavoro.',
};

export const sito = {
  /** Dominio definitivo; finché manca si resta su *.workers.dev con noindex. */
  dominio: '[DA COMPLETARE: dominio]',
  urlProvvisorio: '[DA COMPLETARE: indirizzo *.workers.dev assegnato da Cloudflare]',
  lingua: 'it',
  /** Resta true finché MANCANTI.md ha voci bloccanti. */
  noindex: true,
};

export const contatti = {
  email: '[DA COMPLETARE: email di contatto]',
  /** Mittente delle email automatiche del form, provvisorio finché non c'è il dominio. */
  emailMittenteForm: '[DA COMPLETARE: mittente email del form]',
  telefono: '[DA COMPLETARE: numero di telefono]',
  whatsapp: '[DA COMPLETARE: numero WhatsApp Business]',
  linkPrenotazione: '[DA COMPLETARE: link prenotazione call (Cal.com, Calendly o Google Calendar)]',
  durataCallMinuti: 20,
  /** Tempo entro cui Manuel risponde dopo il primo contatto (sezione Fiducia). */
  tempoRisposta: '[DA COMPLETARE: tempi di risposta dopo il primo contatto]',
  linkedin: '[DA COMPLETARE: profilo LinkedIn (facoltativo)]',
};

export const zona = {
  base: 'San Giovanni in Persiceto',
  area: ['San Giovanni in Persiceto', 'Bologna', 'Modena'],
  remoto: true,
  indirizzo: '[DA COMPLETARE: indirizzo o solo comune, da decidere]',
};

export const datiLegali = {
  ragioneSociale: '[DA COMPLETARE: nome o ragione sociale]',
  partitaIva: '[DA COMPLETARE: P.IVA]',
  codiceFiscale: '[DA COMPLETARE: codice fiscale]',
  rea: '[DA COMPLETARE: numero REA, se ditta individuale]',
  sedeLegale: '[DA COMPLETARE: sede legale]',
  pec: '[DA COMPLETARE: PEC (facoltativa sul sito)]',
};

export const servizi = [
  { id: 'automazioni', nome: 'Automazioni', descrizione: 'Workflow n8n che fanno da soli il lavoro ripetitivo.', url: '/automazioni' },
  { id: 'software', nome: 'Software su misura con Claude', descrizione: 'Piccoli programmi che leggono, riassumono e preparano bozze.', url: '/software' },
  { id: 'siti', nome: 'Siti web', descrizione: 'Siti veloci che portano contatti, non solo visite.', url: '/siti-web' },
] as const;

/**
 * Prezzi "a partire da", scritti direttamente (niente "prezzo di lancio").
 * Da confermare dopo i primi progetti (MANCANTI.md).
 */
export const prezzi = {
  valuta: 'EUR',
  voci: [
    { id: 'analisi', nome: 'Analisi iniziale', esempio: 'Call di 30–45 minuti e proposta scritta', da: 0, gratuita: true },
    { id: 'workflow-semplice', nome: 'Primo workflow semplice', esempio: 'Richieste dal sito raccolte in un foglio, con avviso sul telefono', da: 300 },
    { id: 'workflow-ai', nome: 'Workflow medio con AI', esempio: 'Email di richiesta lette da Claude e trasformate in bozza di preventivo', da: 1000 },
    { id: 'sito-vetrina', nome: 'Sito vetrina', esempio: '4–5 pagine, ottimizzato per mobile, SEO di base', da: 600 },
    { id: 'sito-premium', nome: 'Sito premium con 3D', esempio: 'Come questo sito', da: 1500 },
    { id: 'assistenza', nome: 'Assistenza', esempio: 'Controllo, aggiornamenti, piccole modifiche', da: 30, periodo: 'mese' },
  ],
  /** Costi ricorrenti di terzi, scritti a parte. Verificare prima della pubblicazione. */
  costiRicorrenti: [
    { nome: 'Server n8n', valore: 'circa 5–20 € al mese' },
    { nome: 'Chiamate AI', valore: 'in base all’uso' },
    { nome: 'Risposte AI su WhatsApp', valore: '0,0572 € l’una in Italia (da verificare)' },
  ],
  fattoriPrezzo: 'Il prezzo varia con il numero di passaggi, i programmi da collegare e se serve l’AI.',
};

/** Contenuti ancora da fornire. */
export const contenuti = {
  fotoManuel: '[DA COMPLETARE: foto vera di Manuel]',
  testoChiSono: '[DA COMPLETARE: testi "Chi sono"]',
  casiReali: '[DA COMPLETARE: 2–3 casi d’uso reali con numeri veri]',
  screenshotClienti: '[DA COMPLETARE: screenshot di siti fatti per clienti, con permesso]',
  messaggiChiave: '[DA COMPLETARE: 4–5 messaggi chiave in riferimenti/messaggi.md]',
  webhookN8n: '[DA COMPLETARE: URL webhook n8n, solo come variabile d’ambiente]',
  turnstileSiteKey: '[DA COMPLETARE: chiave pubblica Cloudflare Turnstile]',
  analytics: '[DA COMPLETARE: scelta tra Cloudflare Web Analytics e Plausible]',
};

/**
 * Testimonianze e casi veri: lo spazio è pronto ma resta nascosto
 * finché la lista è vuota (mai testimonianze inventate).
 */
export const testimonianze: { testo: string; autore: string; attivita: string; consenso: true }[] = [];
export const mostraTestimonianze = testimonianze.length > 0;

/** Data dell'ultimo aggiornamento mostrata nella barra di stato. */
export const ultimoAggiornamento = new Date().toISOString().slice(0, 10);
