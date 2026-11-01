# Piano sito web

31 ottobre 2026 · Manuel

## Obiettivo e posizionamento

Il sito ha un solo compito: far prenotare una call conoscitiva di 20 minuti a un potenziale cliente. Tutto il resto (3D, demo, casi d'uso) serve a convincerlo che sai fare quello che vendi.

- **Pubblico**: si parte da titolari e responsabili di micro e piccole imprese della zona Persiceto–Bologna–Modena, ma né il tipo di cliente né la zona sono un limite (professionisti, startup, aziende più grandi, anche fuori zona): i testi non devono far pensare a un servizio solo locale o solo per piccole imprese, e va detto che si lavora anche da remoto. Molti visitano da telefono, spesso dopo un contatto diretto o un passaparola.
- **Promessa**: "Le attività ripetitive le fa un sistema, tu fai il tuo lavoro." Automazioni n8n, software su misura con Claude, siti web.
- **Prova**: il sito stesso è il portfolio. Velocità, design e demo funzionanti valgono più di qualsiasi testo.
- **Brand**: nome da decidere, segnaposto nel sito. Il progetto parte da zero: non usare materiale, codice o stili di progetti precedenti.
- **Tono**: moderno e d'impatto, ma concreto. Parla di ore risparmiate e di errori evitati, non di "intelligenza artificiale rivoluzionaria".

Moderno non vuol dire più bello del sobrio: vuol dire più memorabile. Il rischio è che diventi lento o confuso, quindi ogni effetto deve passare il test "aiuta a capire o a contattarmi?".

## Cosa emerge dalle ricerche

Il 3D è credibile nel 2026 solo se è veloce e ha uno scopo; la maggior parte dei siti di agenzie di automazione sono template Framer tutti uguali, ed è lì che puoi distinguerti.

- **3D sì, ma con misura.** Il Sito dell'Anno Awwwards 2025 (Lando Norris) usa GSAP e WebGL ([Digidop](https://www.digidop.com/blog/5-web-design-trends-2025/index.md)). Altre analisi però notano che 3D e personalizzazione AI hanno reso meno del previsto, e che il 3D va usato solo quando risolve un problema ([Clay](https://clay.global/blog/web-design-guide/web-design-trends), [StudioMeyer](https://studiomeyer.io/es/blog/webdesign-trends-2026-reality-check.md)).
- **Velocità come prova.** Rifare una landing in Astro ha portato Lighthouse da 44 a 99, con un componente react-three-fiber che ripiega su markup statico senza WebGL o con movimento ridotto ([DEV](https://dev.to/noguchilin/i-rebuilt-a-slow-landing-page-in-astro-and-took-lighthouse-from-44-to-99-199i)).
- **Il mercato è pieno di template.** I siti di agenzie AI sono spesso template Framer come Niva o Automatee, centrati sulla call prenotata ([Framer](https://www.framer.com/marketplace/templates/automatee/)). Spiegano in linguaggio business, ma si somigliano tutti.
- **Cosa convince i decisori.** Le guide di settore insistono su linguaggio non tecnico, esempi concreti per servizio con tempi, e un sito che sia esso stesso esempio di quello che vendi ([Passionates](https://passionates.com/ai-agency/ai-automation-agency-website)).
- **Leva locale (per i clienti di Bologna e Modena).** Il Bando Voucher Digitali I4.0 della Camera di Commercio di Bologna è giunto a una nuova edizione ([CCIAA Bologna](https://www.bo.camcom.gov.it/it/node/3338)): una pagina che spiega come usarlo per finanziare un progetto è un buon gancio commerciale. Verifica edizione e scadenze 2026 sul sito camerale prima di pubblicarla.

**Conclusione**: non serve più 3D degli altri, serve un 3D che spieghi cosa fai. Il tuo vantaggio sono le demo funzionanti, un'identità originale e la presenza sul territorio da cui parti, che i template non hanno.

## Stack tecnico e hosting

Astro statico su Cloudflare (Workers con static assets), con three.js e GSAP solo dove servono: velocità da sito statico, effetti da sito premium, costo di hosting zero.

| Pezzo | Scelta | Perché |
| --- | --- | --- |
| Framework | Astro, output statico | Zero JavaScript di default; si carica solo quello delle "isole" interattive |
| 3D | three.js (vanilla) in un'isola `client:visible` | Il 3D si scarica solo quando entra nello schermo, la pagina resta leggera |
| Animazioni | GSAP + ScrollTrigger + Lenis | Linea di flusso e interazioni allo scroll mirate, una sezione pinnata, scroll fluido |
| Stile | CSS con design token (o Tailwind) | Coerenza tra pagine, tema scuro nativo |
| Hosting | Cloudflare Workers static assets | Uso commerciale ammesso, file statici gratuiti, deploy a ogni push su GitHub |
| Form | Webhook n8n + Cloudflare Turnstile | Il contatto diventa una demo di automazione, senza spam |
| Dominio | Cloudflare Registrar o registrar italiano | DNS già nello stesso pannello |
| Analytics | Cloudflare Web Analytics o Plausible | Niente cookie di profilazione, banner più semplice |

Cloudflare ora consiglia Workers con static assets per i progetti nuovi; Pages funziona ancora ma riceve meno novità ([Flavio Copes](https://flaviocopes.com/cloudflare-pages-vs-workers/)). Astro si pubblica su Workers con `npx astro build && npx wrangler deploy` ([Astro docs](https://v5.docs.astro.build/ar/guides/deploy/cloudflare/)).

**Vercel escluso**: i termini dicono che il piano Hobby è solo per uso personale o non commerciale ([Vercel Terms](https://vercel.com/terms)); il piano Pro costa 20 $ per utente al mese.

## Architettura del sito

Sei pagine principali, tutte dirette alla stessa azione: prenotare una call.

```
                         Home
     (3D: la macchina del flusso; linea di flusso; demo interattive)
                           |
   ---------------------------------------------------------
   |             |             |             |             |
Automazioni  Software AI   Siti web     Casi d'uso    Chi sono
workflow n8n app con       portfolio,   "log di       storia, metodo,
animati,     Claude, su    dispositivo  sistema" per  mappa a
costruisci   misura        3D           settore       circuito
la tua
automazione
   |             |             |             |             |
   ---------------------------------------------------------
                           |  ogni pagina chiude con
                   PRENOTA UNA CALL
          (form con n8n e Claude, calendario;
           WhatsApp nella barra mobile)

Ovunque: barra in alto fissa con logo, icona del menu e "Contattami" (prenota, chiama, WhatsApp, modulo);
footer con P.IVA, CF, REA · Privacy · Cookie · Blog; barra di stato stile terminale; interruttore "vista tecnica"
Pagina 404: "workflow rotto"
```

La home racconta tutto in breve; le pagine servizio approfondiscono. Sezioni della home, nell'ordine:

1. Hero con la macchina del flusso 3D e pulsante "Prenota una call".
2. Problema: "Il lunedì mattina", la timeline in cui le attività ripetitive spariscono una dopo l'altra (non le solite 3 card).
3. Servizi: automazioni, software con Claude, siti web, collegati dalla linea di flusso come nodi del circuito.
4. Demo vive: "Costruisci la tua automazione", calcolatore e simulazione WhatsApp.
5. Casi d'uso per settore, presentati come "log di sistema".
6. Come lavoro: call, analisi, prototipo, consegna, supporto, con cosa succede dopo il primo contatto (tempi di risposta e passi successivi).
7. Prezzi "da X €", con preventivo fisso dopo l'analisi gratuita.
8. "Quando non conviene automatizzare" (vedi Fiducia).
9. FAQ (con una risposta sui voucher per le imprese di Bologna e Modena) e invito finale con form.

L'ordine è una base: nella proposta delle 3 direzioni creative può cambiare, purché ogni sezione porti verso il contatto.

## Direzione visiva e componenti 3D

Il momento memorabile è uno solo: **"Il caos dell'ufficio diventa un flusso."** Il resto del sito usa idee e interazioni 2D leggere ma originali, così resta veloce e leggibile senza essere anonimo.

**Look**

- Tema scuro tecnologico. La palette definitiva si sceglie tra le varianti della sezione Direzione creativa; la tabella sotto è la base "Circuito" e fissa i ruoli che ogni variante deve coprire. Un solo colore di azione per i pulsanti.
- Tipografia: vedi Direzione creativa; testo mai sotto i 16 px su mobile.
- Composizione con ritmo non standard (asimmetrie, elementi che escono dalla griglia, sezioni di densità diverse), sempre leggibile e con gerarchia chiara. Niente foto stock con persone.

**Palette base "Circuito"** (il blu comunica affidabilità, il ciano tecnologia)

| Ruolo | Colore |
| --- | --- |
| Sfondo | blu notte #0B1220 |
| Superfici e card | #111A2E |
| Bordi e linee | #1E2A44 |
| Testo principale | #E6EDF7 |
| Testo secondario | #94A3B8 |
| Azione (pulsanti, link) | ciano elettrico #22D3EE |
| Accento secondario (grafici, nodi 3D) | blu #3B82F6 |
| Stato ok | verde #34D399 |

Ogni variante definisce gli stessi ruoli e tutte le combinazioni testo/sfondo devono passare il contrasto WCAG AA. Nel 3D i tubi luminosi usano il colore di accento della variante scelta, i nodi il colore secondario.

**Componente 3D principale (home): "La macchina del flusso"**

- **Scena**: a sinistra un mucchio disordinato di elementi stilizzati (email, fogli, bolle WhatsApp, PDF di fatture). Al centro una catena di 4–5 nodi, come quelli di n8n, collegati da tubi luminosi. A destra gli stessi elementi escono ordinati: un preventivo, una riga in tabella, una notifica.
- **Materiali**: vetro satinato per i nodi, metallo satinato con riflessi blu per i connettori, luce da HDRI studio 1k. Geometrie generiche, nessun logo di terzi.
- **Camera**: FOV 35, leggero movimento orbitale col puntatore su desktop, fisso su mobile.
- **Coreografia allo scroll** (sezione pinnata):
  1. 0%: caos visibile, titolo "Quanto tempo perdi in attività che un sistema farebbe da solo?"
  2. 40%: i nodi si accendono uno alla volta con etichette HTML (Ricevi, Leggi con Claude, Archivia, Notifica).
  3. 70%: gli elementi attraversano la catena e si ordinano.
  4. 100%: risultato ordinato e pulsante "Prenota una call".
- **Interazione**: tap su un nodo mostra cosa fa in una frase.
- **Collegamento al resto del sito**: all'uscita dalla sezione, il tubo luminoso diventa la linea di flusso SVG che attraversa le sezioni successive (vedi Direzione creativa).
- **Fallback**: con movimento ridotto o senza WebGL, un'immagine statica del fotogramma finale e le stesse etichette in HTML.

**Componenti secondari (leggeri)**

- Pagina **Siti web**: un dispositivo 3D semplice (telefono e laptop stilizzati) che ruota allo scroll e mostra i progetti dimostrativi; i progetti sono presentati come casi studio brevi (vedi Contenuti e portfolio), non come griglia di screenshot.
- Pagina **Automazioni**: schemi di workflow animati in SVG, non 3D.
- **Micro-interazioni** pensate caso per caso (feedback su tap e hover, stati dei pulsanti); niente reveal uguale su ogni sezione.

**Budget**: modelli GLB sotto 400 KB, 3D sotto 1,5 MB per pagina, pixel ratio massimo 2, 60 fps su un telefono di tre anni fa.

**Metodo di lavoro sul 3D** (a ogni checkpoint): screenshot a 390 e 1440 px a più profondità di scroll, test funzionale con Playwright, voto 1–10 su forma, luce, ritmo, mobile e conversione; correggi i 3 punti più deboli. Al massimo 3 giri di correzione (regola di pro-design), poi riporta cosa resta aperto invece di continuare a rifinire.

## Direzione creativa

**Principio generale**: l'ordine di priorità è prestazioni e accessibilità, poi chiarezza e contatto, poi creatività. Dentro questi limiti, in ogni scelta (layout, testi, interazioni, dettagli) preferisci l'opzione creativa e distintiva a quella standard, finché resta chiara, veloce e accessibile. Se una soluzione è quella che userebbe chiunque, cerca un'alternativa. Il sito non deve sembrare un template: deve avere un'idea che lo attraversa tutto e qualche momento che il visitatore ricorda. Questa è una lista ampia di proposte; Manuel sceglierà cosa tenere vedendo le anteprime. Il budget di prestazioni resta: la fantasia passa soprattutto da idee e interazioni 2D leggere.

**Concetto guida: il sito è un circuito che si costruisce**

- Una linea di "flusso" parte dal 3D della home e, scorrendo, collega una sezione all'altra come una pista di un circuito. Ogni sezione è un nodo che si "accende" quando la linea lo raggiunge.
- Mappa della zona di partenza disegnata come un circuito stampato, con i paesi come componenti collegati. Deve suggerire "si parte da qui" e lasciare aperta l'estensione (piste che escono dai bordi della mappa), non un confine.

**Identità visiva**

- Palette: base blu notte per l'affidabilità, ma con un accento che i concorrenti non usano. Varianti da proporre: "Circuito" (ciano), "Segnale" (blu notte con arancio segnale #FF7A1A), "Ambra" (quasi nero con ambra #F5B83D e ciano come secondario), "Terminale" (quasi nero con verde segnale). Tutte devono passare il contrasto WCAG AA.
- Tipografia con carattere: un font da titoli con personalità (non Inter, Roboto o simili di default) e un monospace per dettagli tecnici, numeri ed etichette dei nodi.
- Illustrazioni in stile tecnico (schemi, blueprint, isometrico) al posto delle foto stock, affiancate da immagini reali (vedi Regole sulle skill).
- Tema giorno/notte con un'animazione di passaggio, rispettando la preferenza del sistema.

**Interazioni memorabili**

- "Costruisci la tua automazione": il visitatore sceglie 3 blocchi (cosa arriva, cosa fa l'AI, cosa succede alla fine), vede il workflow animarsi, il tempo risparmiato stimato e la fascia di prezzo indicativa; un pulsante apre la richiesta di call già compilata.
- "Il lunedì mattina di una PMI": timeline allo scroll in cui le attività ripetitive spariscono una dopo l'altra man mano che vengono automatizzate.
- Confronto prima/dopo con cursore da trascinare (ufficio caotico / processo automatizzato).
- Cursore che lascia una breve scia di nodi su desktop (disattivata con movimento ridotto e su mobile).
- Titoli che si "decodificano" come testo di un terminale al primo ingresso (solo decorativo, testo leggibile subito per screen reader e senza animazioni).
- Calcolatore di risparmio che si anima mentre il visitatore sceglie.

**Il sito mostra come è fatto**

- Interruttore "vista tecnica": mostra sopra la pagina come funziona il sito stesso (il workflow dietro al form, il peso della pagina, il punteggio Lighthouse, lo stack usato). Dimostra competenza senza spiegarla.
- Barra di stato in fondo alla pagina, stile terminale: "sistema operativo", ultimo aggiornamento del sito, automazioni attive (solo dati veri o segnaposto).
- Casi studio presentati come "log di sistema": problema, intervento, risultato, con date e numeri veri.
- Opzionale: un riquadro "chiedi al sito" con Claude che risponde su servizi e prezzi, con limite di spesa e risposte basate solo sui contenuti del sito.

**Dettagli con personalità**

- Pagina 404 a forma di "workflow rotto" con un nodo in errore e il pulsante per tornare alla home.
- Microcopy con un tono umano e un po' ironico (pulsanti, messaggi di errore, conferme), mai gergo tecnico incomprensibile.
- Easter egg per curiosi: una modalità "terminale" attivabile con una combinazione di tasti, che permette di navigare il sito con comandi testuali.
- "Chi sono" con una foto vera e un tono diretto: consulente, non agenzia.

**Filtro anti-template** (da non fare)

- Niente blob sfumati, card in vetro, griglie bento generiche, icone stock, gradienti viola-blu da startup AI.
- Niente frasi fatte come "Trasforma il tuo business", "Soluzioni innovative", "Il futuro è adesso".
- Niente animazione uguale su ogni sezione: ogni effetto deve avere un motivo.

**Processo creativo**

- Prima della fase 2, proponi 3 direzioni molto diverse (una sicura, una audace, una sperimentale), ognuna con anteprima della home a 390 e 1440 px, palette, font e una delle interazioni sopra realizzata in bozza. Manuel sceglie, anche mescolando.
- Per ogni direzione indica in una riga in cosa si distingue da 3 siti concorrenti tipici.
- **Scelta di Manuel (fine fase 1)**: direzione C, "La frase che si accende" (sperimentale): palette Terminale (quasi nero con verde segnale), Fraunces per titoli e testo, Geist Mono per i dettagli tecnici; il flusso prende il posto di una parola nel titolo. Bozza in `/lab/direzione-c`.

## Regole sulle skill

Le skill di design hanno regole proprie che in alcuni punti contraddicono questo piano. Vale la regola di pro-design: quello che il piano fissa vince sulle skill; per tutto il resto vale la tabella "chi vince su cosa" di pro-design. Se durante il lavoro una skill chiede qualcosa che contraddice il piano, segui il piano e segnalalo nel riepilogo di fase.

**Eccezioni volute alle regole di design-taste-frontend** (fanno parte del concetto, non sono ornamenti)

- **Monospace**: consentito solo per etichette dei nodi, numeri tecnici, barra di stato, modalità terminale e l'effetto di decodifica dei titoli. Mai per il testo corrente. Il secondo font resta il display; al massimo due famiglie in tutto.
- **Linee**: la linea di flusso e le piste della mappa a circuito sono elementi del concetto. Linee piene di almeno 2 px, colore piatto della palette, nessun bagliore fuori dalla scena 3D. Nessun'altra linea sottile, divisore o griglia decorativa.
- **Bagliori e bloom**: solo dentro la scena 3D, mai nell'HTML intorno.
- Per queste sole regole passa `--allow` all'inspector e scrivilo nel report; tutte le altre regole della casa restano valide.

**Interazioni distribuite** (una "cosa viva" per pagina e al massimo 2–3 scene allo scroll per pagina, una sola con 3D pesante in tutto il sito)

| Pagina | Cosa viva | Scene e dettagli |
| --- | --- | --- |
| Home | "Costruisci la tua automazione" | 3D "La macchina del flusso", "Il lunedì mattina", linea di flusso |
| Automazioni | Calcolatore di risparmio | Schemi di workflow SVG animati, prima/dopo con cursore |
| Software AI | Simulazione WhatsApp | Frammento di interfaccia di un software su misura |
| Siti web | Dispositivo 3D leggero con i progetti dimostrativi | Casi studio brevi dei progetti, confronto tra gli stili |
| Casi d'uso | Filtro dei "log di sistema" per settore | — |
| Chi sono | Mappa a circuito: tap su un paese | — |
| Contatti | Form intelligente; "chiedi al sito" solo se confermato | — |

Su tutto il sito, leggeri e non contati come "cosa viva": barra di stato, interruttore "vista tecnica", cursore con scia (solo desktop), tema giorno/notte, pagina 404, modalità terminale nascosta.

**Immagini**

La soglia di design-taste-frontend (almeno 4 immagini reali per pagina; gli SVG non contano) si raggiunge con:
- frammenti di interfaccia realistici costruiti in HTML (workflow, risultati, pannelli) con dati coerenti indicati come esempio, marcati `data-ui`;
- mappe e foto d'archivio del territorio da collezioni aperte con licenza commerciale, con crediti nel footer;
- una foto vera di Manuel (segnaposto finché non c'è).
Mai foto stock con persone; mai immagini trovate presentate come lavori propri.

**Processo**

- **Stop e domande**: gli stop a fine fase e le scelte (3 direzioni creative, 2 varianti del 3D) sono richiesti da Manuel e prevalgono sulla regola "chiedi al massimo una volta" di pro-design. Dentro una fase, le scelte minori le decidi tu e le scrivi nel riepilogo.
- **Direzioni creative**: usa `draw.mjs --options 3` di design-taste-frontend per le composizioni; ogni direzione prende una delle varianti di palette del piano (`--keep palette`), in modo che ci sia una direzione sicura, una audace e una sperimentale.
- **Revisione**: vale il ciclo di pro-design, al massimo 3 giri, poi report di cosa resta aperto. Sostituisce i giri minimi e il voto 8 di sito-3d-premium.
- **Stack**: Astro e Cloudflare come da piano, non Vite, Netlify o Vercel citati negli esempi delle skill.
- **Rete**: la ricerca di immagini libere di design-taste-frontend (Openverse, Wikimedia, archivi museali) e il browser per l'inspector richiedono domini esterni. All'inizio della prima sessione elenca a Manuel i domini da autorizzare; se restano bloccati, disegna le immagini e segnalalo nel report.

## Demo vive con n8n e Claude

Il sito non descrive le automazioni: le fa provare. Quattro demo, dalla più semplice alla più d'effetto.

| Demo | Cosa vede il visitatore | Cosa succede dietro |
| --- | --- | --- |
| Form di contatto intelligente | Invia la richiesta e riceve in pochi secondi un'email di risposta personalizzata | Webhook n8n verifica Turnstile, Claude riassume la richiesta, n8n la salva e ti avvisa su telefono |
| Calcolatore di risparmio | Sceglie il settore e le attività ripetitive, vede ore ed euro risparmiati all'anno | Logica nel browser; con il consenso, il risultato arriva via email come mini-report |
| Simulazione WhatsApp | Una chat finta mostra un cliente che chiede un preventivo e riceve risposta automatica | Costruita da zero, con i toggle per tipo di attività |
| Costruisci la tua automazione | Sceglie 3 blocchi, vede il workflow animarsi con tempo risparmiato e fascia di prezzo, invia la richiesta già compilata | Logica nel browser, prezzi da `src/config/sito.ts`; l'invio passa dallo stesso endpoint del form |

**Regole per le demo**

- Il form passa da Turnstile: il token si verifica lato server prima di processare la richiesta ([Cloudflare](https://developers.cloudflare.com/use-cases/solutions/protect-sensitive-forms-fraud-abuse/index.md)). Aggiungi anche un limite di invii per IP.
- L'URL del webhook n8n non va esposto direttamente: passa da un piccolo endpoint su Cloudflare Worker che verifica Turnstile e poi inoltra a n8n.
- Mai promettere risultati inventati: il calcolatore mostra stime con le ipotesi scritte sotto.
- Ogni demo finisce con lo stesso invito: "Vuoi questo per la tua attività? Prenota una call."

## SEO e contenuti

Parti da ricerche locali e concrete ("automazione preventivi Bologna", "sito web aziende Modena"), non da parole generiche come "intelligenza artificiale". Le pagine servizio devono funzionare anche per chi cerca fuori zona ("automazione n8n per studi professionali", "consulente n8n da remoto").

- **Profilo Google Business** con categoria di consulenza informatica, area servizio Persiceto–Bologna–Modena, link al sito e alla prenotazione.
- **Una pagina per servizio** con titolo, descrizione e testo propri; niente pagine clonate città per città.
- **Dati strutturati** Schema.org: `ProfessionalService` con area servita, `Service` per ogni offerta, `FAQPage` sulle domande frequenti.
- **Casi d'uso per settore** (studi professionali, artigiani, commercio, agricoltura): ogni scheda con problema, soluzione, strumenti e tempo risparmiato stimato.
- **Blog leggero**: 1 articolo al mese su domande vere dei clienti.
- **Tecnico**: sitemap, robots.txt, URL puliti in italiano, immagini AVIF/WebP con testo alternativo, Open Graph per le anteprime su WhatsApp e LinkedIn.
- **Leggibilità per motori AI**: risposte brevi e chiare in alto in ogni pagina e FAQ esplicite.

## Contenuti e portfolio

I testi partono dai messaggi chiave di Manuel e il portfolio iniziale è fatto di progetti dimostrativi dichiarati come tali, finché non arrivano i casi veri.

- **Messaggi chiave**: Manuel fornisce 4–5 frasi (perché lui, per chi lavora, cosa cambia per il cliente, come lavora, la zona) in `riferimenti/messaggi.md`. Scrivi le bozze dei testi partendo da quelle e marcale `[BOZZA]` finché non vengono approvate. Se il file manca, aggiungilo a `MANCANTI.md` e usa testi segnaposto.
- **Lingua**: solo italiano.
- **Portfolio senza clienti**: 2–3 siti dimostrativi per attività di settori diversi (per esempio officina, studio professionale, agriturismo), ognuno con uno stile proprio, con nomi inventati e la dicitura "progetto dimostrativo" ben visibile. Niente nomi o loghi di aziende reali, niente testimonianze inventate.
- **Casi studio, non griglia**: nella pagina Siti web ogni progetto dimostrativo è un caso studio breve con: il brief (attività inventata e dichiarata come tale), le scelte di design e il perché, cosa fa il sito per quell'attività, l'anteprima navigabile o le immagini. Il lavoro viene prima del testo: l'anteprima apre il caso, la spiegazione la segue.
- **Stili diversi**: almeno uno dei progetti è sobrio e classico, curato ma non spettacolare, e originale (vale il filtro anti-template). Serve a far capire che il sito di Manuel è una vetrina delle sue capacità, non l'unico stile che propone. Sulla pagina una riga lo dice in modo semplice, per esempio: "Questo sito mostra cosa so fare; il tuo avrà lo stile giusto per la tua attività, anche sobrio e classico."
- **Casi studio veri**: sostituiscono i dimostrativi man mano che arrivano i primi clienti.
- **Nessun riferimento esterno**: in `riferimenti/` c'è solo `messaggi.md`. Non usare materiale di progetti precedenti.
- **Email del form**: mittente provvisorio come segnaposto finché non c'è il dominio.

## Fiducia

Per ora non ci sono testimonianze né clienti: il sito crea fiducia con quello che c'è, senza inventare nulla.

| Elemento | Cosa contiene | Dove compare |
| --- | --- | --- |
| Una persona vera | Foto di Manuel (segnaposto finché manca), tono diretto, il territorio da cui parte, "consulente, non agenzia" | Chi sono, home (vicino all'invito finale), contatti |
| Trasparenza | Prezzi "da", preventivo a prezzo fisso dopo l'analisi gratuita, cosa succede dopo il primo contatto: tempi di risposta e passi successivi | Home (Come lavoro, Prezzi), pagine servizio, contatti, conferma del form |
| Onestà | Sezione "Quando non conviene automatizzare": i casi in cui un'automazione non ripaga (attività rare, processi che cambiano ogni settimana, volumi troppo bassi) e cosa consigliare invece | Home e Automazioni |
| Prova pratica | Le demo funzionanti e il sito stesso: velocità, cura, vista tecnica | Home, pagine servizio, vista tecnica su tutto il sito |
| Testimonianze e casi veri | Spazio già pronto nel codice ma nascosto finché non ci sono contenuti reali; si attiva da `src/config/sito.ts` | Home, Casi d'uso, Siti web |

- I tempi di risposta stanno in `src/config/sito.ts` come segnaposto finché Manuel non li conferma.
- Nessun numero, logo, recensione o "clienti soddisfatti" finto per riempire lo spazio.

## Prezzi ed esempi di progetto

Il sito mostra prezzi "a partire da", scritti direttamente (senza presentarli come prezzi di lancio o promozioni), e promette un preventivo a prezzo fisso dopo l'analisi gratuita.

| Servizio | Esempio tipico | Prezzo |
| --- | --- | --- |
| Analisi iniziale | call di 30–45 minuti e proposta scritta | gratuita |
| Primo workflow semplice | richieste dal sito raccolte in un foglio, con avviso sul telefono | da 300 € |
| Workflow medio con AI | email di richiesta lette da Claude e trasformate in bozza di preventivo | da 1.000 € |
| Sito vetrina | 4–5 pagine, ottimizzato per mobile, SEO di base | da 600 € |
| Sito premium con 3D | come questo sito | da 1.500 € |
| Assistenza | controllo, aggiornamenti, piccole modifiche | da 30 € al mese |

**Come presentarli sul sito (tono sicuro, non incerto)**

- Una frase decisa, non una lista di avvertenze: "Da 300 €. Dopo l'analisi gratuita ricevi un preventivo a prezzo fisso, che non cambia in corso d'opera."
- Due righe su cosa fa variare il prezzo: quanti passaggi, quanti programmi da collegare, se serve l'AI.
- Costi ricorrenti scritti chiaramente e a parte: server n8n (circa 5–20 € al mese), chiamate AI, risposte AI su WhatsApp (0,0572 € l'una in Italia).
- Un rimando ai voucher digitali camerali. Niente "prezzo di lancio" né "per i primi clienti": i prezzi si scrivono e basta (decisione di Manuel, fine fase 1).
- Le fasce di prezzo stanno in `src/config/sito.ts`, così si aggiornano in un punto solo.

## Requisiti legali in Italia

Con la partita IVA, il numero va nella home page del sito: l'obbligo vale anche se il sito è solo pubblicitario ([Diritto.it](https://www.diritto.it/l-indicazione-della-partita-iva-sul-sito-web-e-obbligatoria/)). Far controllare i testi finali al commercialista.

- [ ] **Footer su ogni pagina**: nome o ragione sociale, partita IVA, codice fiscale; per una ditta individuale anche il numero REA ([Il Commercialista Online](https://www.ilcommercialistaonline.it/partita-iva-e-obblighi)).
- [ ] **Privacy policy** ai sensi del GDPR, che copra form, demo, email e analytics.
- [ ] **Cookie banner** solo se si usano cookie non tecnici. In quel caso: "Accetta" e "Rifiuta" (o una X) con la stessa evidenza, niente consenso tramite scroll, niente cookie wall ([Legiscope](https://www.legiscope.com/blog/cookie-linee-guida-garante.html)). Con analytics senza cookie si evita del tutto il banner.
- [ ] **Consenso esplicito nei form**: casella non preselezionata per le comunicazioni commerciali, separata dall'invio della richiesta.
- [ ] **Crediti** per modelli 3D, font e immagini con licenza che richiede attribuzione.
- [ ] **Accessibilità**: le microimprese di servizi sono escluse dall'obbligo dell'European Accessibility Act ([Altroconsumo](https://www.altroconsumo.it/hi-tech/internet-telefono/news/accessibilita-prodotti-servizi)), ma il sito va reso accessibile comunque: è un argomento di vendita.

**Attività non ancora avviata** (niente P.IVA né dominio): il sito si costruisce con segnaposto ben visibili, del tipo `[DA COMPLETARE: P.IVA]`, e resta sull'indirizzo gratuito `*.workers.dev` con `noindex`, così Google non lo indicizza. Va reso pubblico con offerta commerciale solo dopo l'apertura della P.IVA e la sostituzione di tutti i segnaposto.

## Prestazioni e accessibilità

Obiettivo: Lighthouse 95+ su mobile in tutte e quattro le categorie, anche con il 3D.

| Metrica | Obiettivo |
| --- | --- |
| JavaScript in home al primo caricamento | sotto 50 KB compressi (3D escluso, caricato dopo) |
| LCP | sotto 2,5 s su 4G lento |
| CLS | sotto 0,05 |
| INP | sotto 200 ms |
| Peso 3D per pagina | sotto 1,5 MB |
| Contrasto testo | almeno WCAG AA |

- Il titolo e il pulsante della home sono HTML puro: si vedono subito, anche prima del 3D.
- Ogni animazione rispetta `prefers-reduced-motion`.
- Navigazione completa da tastiera, focus visibile, testi alternativi.
- Barra fissa in basso su mobile con "Chiama" e "WhatsApp", pulsanti di almeno 44 px.

## Setup e regole di progetto

1. **Repository**: `Il-mio-sito-web` (privato) su GitHub.
2. **Rete dell'ambiente**: limitata (npm e GitHub). Se una richiesta viene bloccata, dimmi quale dominio aggiungere (es. download dei browser di Playwright, HDRI di Poly Haven).
3. **Font e librerie da npm** (es. `@fontsource`), non da CDN esterni.
4. **Deploy**: il repository è collegato a Cloudflare (Workers Builds); basta il push su GitHub.
5. **CLAUDE.md**: crea un CLAUDE.md con le regole di questo piano: ordine di priorità (prestazioni e accessibilità, poi chiarezza e contatto, poi creatività), budget di prestazioni, un solo momento 3D pesante, fallback obbligatori, principio creativo e filtro anti-template, contenuti solo veri, screenshot a 390 e 1440 px prima di ogni consegna.
6. **Rami**: un ramo per fase, unione su `main` solo dopo l'anteprima approvata.
7. **Skill**: all'inizio della prima sessione elenca le skill che vedi. Se disponibili, usa pro-design come regia, design-taste-frontend per la direzione visiva, sito-3d-premium e threejs-web-3d per il 3D, gsap-scroll-animation per le animazioni, playwright-cli per i test e web-design-guidelines per la revisione finale. Se una manca, dillo e segui le regole di questo piano.
8. **Controllo del 3D**: negli screenshot automatici il WebGL può risultare nero. Segnalalo nel riepilogo e chiedi a Manuel di verificare il componente sul telefono dal link di anteprima.
9. **Ricerche online**: cerca in rete da solo quando serve, senza chiedere. Sempre prima di usare API, configurazioni o versioni di librerie e servizi (Astro, three.js, GSAP, Cloudflare, Turnstile, n8n): le tue conoscenze possono essere superate. Anche per verificare dati che finiscono sul sito (requisiti legali, voucher, costi di terzi). Regole:
   - preferisci la documentazione ufficiale; elenca le fonti usate nel riepilogo di fase;
   - siti di altri solo come ispirazione, mai copiati: struttura, testi e grafica devono essere originali;
   - immagini, modelli 3D e font solo con licenza che ne permette l'uso commerciale, con crediti dove richiesto;
   - se la ricerca non chiarisce un dubbio che cambia il risultato, chiedi invece di indovinare.

**Struttura delle cartelle** (da rispettare dall'inizio; nomi di codice in inglese, URL e testi in italiano):

```
Il-mio-sito-web/
├── CLAUDE.md               regole del progetto
├── MANCANTI.md             dati mancanti e cosa bloccano
├── README.md               come avviare, testare e pubblicare
├── wrangler.jsonc          configurazione Cloudflare
├── docs/
│   └── PIANO.md            questo piano
├── riferimenti/            materiale di partenza, non pubblicato
├── public/                 file serviti così come sono
│   ├── 3d/                 modelli .glb e HDRI compressi
│   └── robots.txt
├── src/
│   ├── config/sito.ts      dati del sito, segnaposto e prezzi
│   ├── pages/              una pagina per URL (index, automazioni,
│   │                       software, siti-web, casi-d-uso, chi-sono,
│   │                       contatti, privacy, cookie, blog/, lab/)
│   ├── layouts/            layout base con header e footer
│   ├── components/
│   │   ├── ui/             pulsanti, card, campi
│   │   ├── sections/       sezioni delle pagine (hero, servizi, faq...)
│   │   ├── three/          componenti 3D
│   │   └── demos/          calcolatore, simulazione WhatsApp, form
│   ├── content/            blog, casi d'uso, progetti dimostrativi
│   ├── styles/             design token e stili globali
│   ├── scripts/            animazioni GSAP e Lenis
│   └── assets/             immagini ottimizzate da Astro
├── worker/                 endpoint /api (Turnstile e inoltro a n8n)
└── tests/                  test Playwright
```

Regole: un componente per file; nessun file oltre le 500 righe, dividilo prima; niente cartelle nuove fuori da questa struttura senza dirlo nel riepilogo; aggiorna il README quando cambia qualcosa su avvio, test o deploy.

**Segnaposto e `MANCANTI.md`**: tutti i dati non ancora disponibili (P.IVA, CF, REA, dominio, numero WhatsApp, link prenotazione, foto, casi reali, nome definitivo del brand) vanno in un unico file `src/config/sito.ts` con valore `[DA COMPLETARE: ...]`. Tieni aggiornato `MANCANTI.md` alla radice del repository, con cosa manca, dove compare e se blocca il lancio, e a fine di ogni sessione elenca le voci nuove o ancora aperte.

## Roadmap a fasi

Sei fasi, ognuna chiusa da un'anteprima. Alla fine di ogni fase: fermati, fai un riepilogo breve, dai il link di anteprima, screenshot a 390 e 1440 px, elenco di cosa manca, e aspetta l'ok prima di proseguire. Il sito deve funzionare e convertire già alla fase 2, senza 3D.

1. **Fondamenta**: progetto Astro statico con TypeScript, design token provvisori (base Circuito, da sostituire con la direzione scelta), font da @fontsource, layout, header, footer, pagine privacy/cookie, `src/config/sito.ts` con segnaposto, `MANCANTI.md`, `noindex`, wrangler per Cloudflare Workers static assets. Niente 3D né animazioni. Alla fine della fase proponi le 3 direzioni creative (sezione Direzione creativa) e aspetta la scelta.
2. **Pagine statiche complete**: tutti i testi, tutte le sezioni (incluse quelle della sezione Fiducia e i casi studio della pagina Siti web), form funzionante. Nessun effetto.
3. **Componente 3D principale** in isolamento su `/lab/flusso` come isola `client:visible`, poi integrato in home, coerente con la direzione scelta. Proponi prima 2 varianti di look del 3D e aspetta la scelta. **Scelta di Manuel**: variante "Vetro e luce" (nodi di vetro satinato, tubo di luce verde, HDRI da studio di Poly Haven).
4. **Movimento e identità**: linea di flusso, sezione pinnata, "Il lunedì mattina" come scena animata con gli interruttori della bozza C (scelta di Manuel a fine fase 2), mappa a circuito, micro-interazioni, tema giorno/notte, pagina 404, componenti 3D secondari.
5. **Demo e automazioni**: form collegato a un endpoint Cloudflare Worker che verifica Turnstile e inoltra a un webhook n8n (URL in variabile d'ambiente, mai nel codice); calcolatore di risparmio con le ipotesi scritte; simulazione WhatsApp; "Costruisci la tua automazione"; vista tecnica e barra di stato; "chiedi al sito" solo se Manuel lo conferma; test con Playwright inclusi errore e spam simulato.
6. **Rifinitura e lancio**: SEO, dati strutturati, Lighthouse e Playwright, dominio, profilo Google Business. La rimozione di `noindex` avviene solo quando `MANCANTI.md` non ha voci bloccanti.

## Cosa deve preparare Manuel

- [ ] Nome del brand e dominio libero.
- [ ] Dati fiscali: P.IVA, codice fiscale, REA se presente.
- [ ] Testi "Chi sono".
- [ ] 2–3 casi d'uso reali o demo con numeri veri; niente testimonianze inventate.
- [ ] Tempi di risposta da promettere dopo il primo contatto.
- [ ] Testimonianze vere, quando arrivano (con il consenso di chi le scrive).
- [ ] Screenshot di siti fatti per clienti, solo con il loro permesso.
- [ ] Link per prenotare la call (Cal.com, Calendly o Google Calendar).
- [ ] Numero WhatsApp Business.
- [ ] 4–5 messaggi chiave in `riferimenti/messaggi.md`.
- [ ] Scelta tra le 3 direzioni creative (palette, font, interazioni) alla fine della fase 1.
- [ ] Decidere se tenere il riquadro "chiedi al sito" con Claude (ha un costo per domanda).
- [ ] Conferma delle fasce di prezzo dopo i primi progetti.

## Fonti

- [Vercel – Terms of Service](https://vercel.com/terms)
- [Flavio Copes – Cloudflare Pages vs Workers](https://flaviocopes.com/cloudflare-pages-vs-workers/)
- [Astro – Deploy su Cloudflare](https://v5.docs.astro.build/ar/guides/deploy/cloudflare/)
- [Cloudflare – Proteggere i form da spam e abusi](https://developers.cloudflare.com/use-cases/solutions/protect-sensitive-forms-fraud-abuse/index.md)
- [Digidop – Web design trends 2026](https://www.digidop.com/blog/5-web-design-trends-2025/index.md)
- [Clay – Web design trends](https://clay.global/blog/web-design-guide/web-design-trends)
- [StudioMeyer – Webdesign trends 2026 reality check](https://studiomeyer.io/es/blog/webdesign-trends-2026-reality-check.md)
- [DEV – Landing in Astro da Lighthouse 44 a 99](https://dev.to/noguchilin/i-rebuilt-a-slow-landing-page-in-astro-and-took-lighthouse-from-44-to-99-199i)
- [DEV – CLAUDE.md per Astro](https://dev.to/olivia_craft/claudemd-for-astro-10-rules-that-stop-ai-from-breaking-island-architecture-41oc)
- [Framer – Template Automatee](https://www.framer.com/marketplace/templates/automatee/)
- [Passionates – AI automation agency website](https://passionates.com/ai-agency/ai-automation-agency-website)
- [Diritto.it – Obbligo P.IVA sul sito](https://www.diritto.it/l-indicazione-della-partita-iva-sul-sito-web-e-obbligatoria/)
- [Il Commercialista Online – Dati obbligatori](https://www.ilcommercialistaonline.it/partita-iva-e-obblighi)
- [Legiscope – Linee guida cookie del Garante](https://www.legiscope.com/blog/cookie-linee-guida-garante.html)
- [Altroconsumo – Accessibility Act](https://www.altroconsumo.it/hi-tech/internet-telefono/news/accessibilita-prodotti-servizi)
- [Camera di Commercio di Bologna – Voucher digitali I4.0](https://www.bo.camcom.gov.it/it/node/3338)
