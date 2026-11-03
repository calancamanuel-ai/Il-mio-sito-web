# Regole del progetto (versione 2)

Riferimento unico: `docs/PIANO.md` (versione 2, 2 novembre 2026). Se una regola qui sotto e il piano sembrano in conflitto, vince il piano. Il piano vince anche sulle skill: se una skill chiede qualcosa che lo contraddice, segui il piano e scrivilo nel riepilogo di fase. Sistema di movimento: `docs/MOVIMENTO.md`.

## Decisioni di Manuel che precisano il piano (3 novembre 2026)

- **Palette**: "Circuito" (scelta definitiva del 3 novembre 2026, `src/styles/tokens.css`): sfondo #0b1220, superfici #111a2e, bordi #1e2a44, testo #e6edf7 e #94a3b8; ciano #22d3ee unico accento (azioni); blu #3b82f6 solo nel circuito e nelle illustrazioni; verde #34d399 solo per lo stato "in ordine".
- **Prezzi**: titolo e testi dicono "Prezzi", mai "prezzi di lancio" o "per i primi clienti". Se in futuro cambiano, si cambiano in `src/config/sito.ts`.
- **Tema giorno/notte**: tolto per ora; il sito è solo scuro.

## Obiettivo

Il sito ha un solo compito: far prenotare una call conoscitiva di 20 minuti. Tutto il resto serve a convincere chi visita che il lavoro ripetitivo si può togliere di mezzo, e che Manuel sa farlo. **Il sito è la prova**: dimostra, non descrive. Ogni pagina e ogni demo chiudono con "Prenota una call".

## Concetto: dal disordine all'ordine

- Una sola storia: un ufficio sommerso dal lavoro ripetitivo diventa, scorrendo, un ufficio in ordine e tranquillo.
- Hero: ufficio isometrico in sezione nel caos → si scompone in "pioggia di codice" fatta di frammenti veri del lavoro d'ufficio ("fattura n. 132", "richiamami", date, oggetti di email) → i caratteri entrano nel circuito, attraversano i nodi (ricevi, capisci, archivia, avvisa), si ordinano → ricompongono lo stesso ufficio calmo. Le stanze in ordine sono toccabili e portano ai servizi.
- Arco della pagina: in alto "nervoso" (caos), al centro "elaborazione", in fondo "calma" quasi immobile e luminosa vicino all'invito finale.
- Le linee del circuito collegano le sezioni e portano "dati" da una all'altra.
- Ispirazione, non citazione: niente pioggia verde di caratteri giapponesi, niente Matrix. Caratteri latini, numeri, parole d'ufficio, colori della palette.

## Ordine di priorità

1. **Prestazioni e accessibilità.** Il movimento non deve mai rendere il sito lento.
2. **Chiarezza e contatto.**
3. **Creatività.** Dentro i limiti sopra, l'opzione distintiva batte quella standard.

## Budget di prestazioni

| Metrica | Limite |
| --- | --- |
| Lighthouse mobile | almeno 90 in tutte le categorie |
| LCP | < 2,5 s su 4G lento (l'immagine statica dell'hero arriva subito, l'effetto parte dopo) |
| CLS | < 0,05 |
| INP | < 200 ms |
| Immagini hero | < 400 KB su telefono, < 900 KB su computer, caricate in modo progressivo |
| JavaScript iniziale | < 80 KB compressi; il resto caricato quando serve |
| Pioggia di codice | un solo canvas, colonne limitate, ferma fuori schermo e con scheda in background, versione leggera su telefono, 60 fps durante lo scroll su un telefono di fascia media |
| Contrasto testo | almeno WCAG AA, anche sopra gli effetti |

- Titolo e pulsante "Prenota una call" della home sono HTML puro, visibili subito.
- Isole Astro, JavaScript vanilla; niente framework UI se non serve. Niente 3D WebGL in questa versione: three.js e i suoi asset escono quando la home nuova sostituisce la vecchia.
- Navigazione completa da tastiera, focus visibile, testi alternativi, testo mai sotto 16 px su mobile.
- Barra fissa in basso su telefono con "Chiama" e "WhatsApp", pulsanti di almeno 44 px, piatta.

## Sistema di movimento (dettagli in `docs/MOVIMENTO.md`)

- Il movimento è il linguaggio principale, non decorazione. Tre stati legati alla posizione: **caos** (hero), **elaborazione** (sezioni centrali), **calma** (fine pagina).
- Ogni sezione ha una sua scena legata al concetto; nessuna sezione statica, nessuna animazione uguale ripetuta ovunque. Sezioni collegate da transizioni continue (circuito, elementi che passano).
- **Decodifica**: testi e immagini entrano come caratteri che si assestano; il testo vero è nel DOM dall'inizio.
- **Cursore** (solo desktop): i caratteri sfiorati si ricompongono per un attimo in parole sensate.
- Si muovono composizione, oggetti, immagini e sfondi su più livelli di profondità, non solo le scritte.
- Interfaccia (pulsanti, menu, stati): regole di Emil Kowalski, ease-out, sotto i 300 ms, pressione con scala 0,97.
- Scene allo scroll: GSAP + ScrollTrigger; su telefono pin corti o assenti, mai la sensazione di restare incastrati.
- Solo `transform` e `opacity` per l'HTML; la pioggia di codice in un solo `canvas`.
- **Sicurezza**: mai più di 3 lampeggi al secondo, nessun flash a schermo intero.
- **`prefers-reduced-motion`**: niente pioggia, niente decodifica; immagini statiche (caos e ordine) e testi subito. Nessun contenuto resta nascosto se lo script non parte.

## Stack

Astro statico + TypeScript, Cloudflare Workers static assets (`wrangler.jsonc`), GSAP + ScrollTrigger + Lenis solo dove servono, canvas 2D per la pioggia. Font e librerie da npm (`@fontsource`), mai da CDN. Niente Vite standalone, Netlify o Vercel. Prima di usare API o configurazioni di librerie e servizi, verifica la documentazione ufficiale aggiornata ed elenca le fonti nel riepilogo.

## Rete

Se una richiesta di rete viene bloccata, non ripiegare in silenzio. Scrivi subito il dominio bloccato e a cosa serve. Se puoi continuare con altro nel frattempo, fallo, ma segnala nel riepilogo di fase ogni lavoro fatto con un ripiego (documentazione non letta, immagini sostituite o disegnate) per poterlo rifare dopo.

## Regole sulle skill

| Skill | Ruolo |
| --- | --- |
| pro-design | Regia: precedenze, controllo dei conflitti, ciclo di revisione (massimo 3 giri) |
| design-taste-frontend | Regole di stile, inspector, critica sugli screenshot |
| impeccable | Critica e miglioramento: critique, audit, bolder, delight, overdrive, polish |
| Emil Kowalski (animate, review-animations, improve-animations, break-ui) | Qualità del movimento dell'interfaccia, prove con dati estremi |
| gsap-scroll-animation | Codice delle scene allo scroll |
| playwright-cli | Test, screenshot, studio dei riferimenti |
| web-design-guidelines | Revisione finale |
| threejs-web-3d, sito-3d-premium | Non usate (niente 3D) |

- **Movimento come linguaggio**: non si applicano le regole delle skill che limitano le scene a 2–3 per pagina o chiedono di tenere tranquillo il resto. La soglia minima di elementi in movimento di design-taste-frontend è superata: va bene. Le regole di Emil valgono per l'interfaccia; le scene allo scroll seguono il piano e gsap-scroll-animation.
- **Eccezioni volute alle regole di design-taste-frontend** (`--allow` all'inspector solo per queste, dichiarato nel report):
  - **Monospace**: pioggia di codice, decodifica, barra di stato, vista tecnica, etichette dei nodi. Mai testo corrente. Al massimo due famiglie in tutto (titoli + mono).
  - **Linee**: solo le linee del circuito, piene, almeno 2 px, colore piatto. Nessun'altra linea sottile, divisore o griglia decorativa.
  - **Luce**: leggero alone solo sui caratteri della pioggia e sui nodi attivi, dentro il canvas; nessun bagliore, ombra o gradiente nell'HTML.
- **Immagini per la soglia di design-taste-frontend**: illustrazioni generate (raster vere), frammenti di interfaccia in HTML marcati `data-ui` (dati d'esempio dichiarati), foto di Manuel (segnaposto finché manca). Mai foto stock con persone, mai immagini trovate presentate come lavori propri.

**Una "cosa viva" per pagina**

| Pagina | Cosa viva |
| --- | --- |
| Home | Il riordino dell'ufficio con le stanze toccabili; "Costruisci la tua automazione" come seconda interazione |
| Automazioni | Calcolatore di risparmio |
| Software su misura | Simulazione WhatsApp |
| Siti web | Casi studio dei progetti dimostrativi navigabili |
| Casi d'uso | Filtro per settore, presentato come registro di sistema |
| Chi sono | Mappa a circuito della zona, con piste che escono dai bordi |
| Contatti | Mini-diagnosi |

Su tutto il sito: barra di stato in fondo (stile terminale, dati veri o segnaposto), interruttore "vista tecnica" (unico posto con i nomi degli strumenti), 404 "un foglio fuori posto".

**Processo**: gli stop di fase e le scelte richieste da Manuel prevalgono su "chiedi al massimo una volta". Stack del piano, non quelli degli esempi delle skill. Revisione: ciclo di pro-design, massimo 3 giri, poi report di cosa resta aperto.

**Regole aggiunte da Manuel (3 novembre 2026)**

*Movimento*

- Un solo file di valori: `docs/MOVIMENTO.md`. Interfaccia (pulsanti, menu, stati): valori di Emil, sotto 300 ms, curva `cubic-bezier(0.23, 1, 0.32, 1)`, pressione `scale(0.97)`. Rivelazioni e scene: valori di design-taste-frontend e gsap-scroll-animation. Mai ease-in, nemmeno per le uscite. `/impeccable animate` non si usa.
- Nessuna libreria di animazione in più (niente Motion): CSS o WAAPI per l'interfaccia, GSAP solo per le scene allo scroll.
- Ogni sezione ha la sua scena, ma al massimo 2 sezioni bloccate (pin) per pagina, ciascuna lunga al massimo 3 schermate su computer e 1,5 su telefono; le altre scene si muovono con lo scroll senza bloccarlo.
- La pioggia di codice non passa mai sopra titoli o testi.
- Titolo e frase dell'hero sono leggibili dal primo istante, senza decodifica; l'eventuale sequenza di apertura finisce entro 1,2 s.
- Il finale "calmo" è lento, non vuoto: ogni schermata ha contenuto.
- In `docs/MOVIMENTO.md` le durate lunghe delle scene e i tremolii dello stato Caos sono dichiarati come scelte volute, così improve-animations e review-animations non li segnalano come errori.

*Stile*

- Palette: il ciano #22D3EE è l'unico accento (azioni); il blu #3B82F6 solo nel circuito e nelle illustrazioni; il verde #34D399 solo per lo stato "in ordine". Superfici separate da passi di tono; bordi solo in campi dei moduli e frammenti di interfaccia marcati `data-ui`.
- Due famiglie al massimo: il font dei titoli deve avere anche una versione adatta al testo corrente (il monospace non si usa mai per il testo).
- design-taste-frontend: `draw` con `--keep palette,type`, solo per le composizioni delle sezioni; concetto e hero li decide il piano.
- Niente etichette piccole maiuscole e spaziate, niente etichette sopra i titoli, niente numerazioni 01/02 (barra di stato e "Come lavoro" compresi).
- Almeno 4 immagini raster vere sulla home: servono almeno 2 dettagli delle stanze oltre alle due immagini dell'ufficio.
- Prompt per Gemini: prima si cercano nelle raccolte libere (Openverse, Wikimedia, Art Institute, Met) riferimenti di stile isometrico e dettagli d'ufficio per il caos; le immagini trovate servono solo come riferimento, non vanno nel sito e non vanno copiate.
- Da prototipare in fase B/C come proposta, non come decisione: l'ultima parte della home (FAQ e invito) passa a uno sfondo chiaro con un taglio netto, come "luce che si allarga". Decide Manuel.

*Processo*

- Un critico alla volta: design-taste-frontend nel ciclo di costruzione; `/impeccable critique` solo in fase A e in fase F. In totale massimo 3 giri di revisione per fase.
- sito-3d-premium e threejs-web-3d non vanno caricate in questo progetto, anche se una richiesta parla di "interattivo", "premium" o "3D".
- Il programma di impeccable (detect, hook) non si scarica né si esegue: si usano solo i suoi file di riferimento; i passaggi che lo richiedono si saltano e si segnalano.

## Filtro anti-template (da non fare)

- Niente blob sfumati, card in vetro, griglie di card o bento, blocchi testo+immagine ripetuti, icone stock, gradienti viola-blu da startup AI. Ogni sezione con una composizione propria.
- Niente frasi fatte: "Trasforma il tuo business", "Soluzioni innovative", "Il futuro è adesso" e simili.

## Contenuti e testi

- **Solo contenuti veri o segnaposto.** Mai inventare dati, prezzi, recensioni, clienti, testimonianze o numeri. I dati mancanti vivono solo in `src/config/sito.ts` come `"[DA COMPLETARE: ...]"` ed elencati in `MANCANTI.md` (cosa, dove compare, se blocca il lancio). Aggiorna `MANCANTI.md` a ogni sessione.
- **Testi orientati ai risultati**: chi legge non è tecnico. Nelle sezioni principali niente nomi di strumenti (n8n, Claude, Astro…) e niente spiegazioni su come è strutturato il lavoro; si parla di tempo recuperato, errori evitati, clienti che ricevono risposta subito, meno stress, con esempi concreti d'ufficio. Dettagli tecnici solo nella vista tecnica, nelle FAQ e nelle pagine di approfondimento.
- Tono umano, diretto, un po' ironico; titoli al massimo 2 righe. Testi da `riferimenti/messaggi.md`, marcati `[BOZZA]` finché non approvati.
- **Fiducia senza testimonianze**: persona vera, trasparenza (prezzi "da", preventivo fisso, cosa succede dopo il contatto e in quanto tempo), onestà ("Quando non conviene automatizzare"), prova pratica (demo, il sito stesso). Lo spazio per testimonianze resta nascosto finché `testimonianze` in `sito.ts` è vuota.
- **Portfolio**: 2–3 progetti dimostrativi dichiarati come tali, stili diversi, almeno uno sobrio e classico; casi studio brevi, il lavoro prima del testo.
- Esempi e demo dichiarati come tali; mai risultati inventati. Prezzi solo da `src/config/sito.ts`; stime del calcolatore con le ipotesi scritte sotto.
- **Sito solo in italiano.** Nomi di codice in inglese, URL e testi in italiano.
- **`noindex`** su tutto il sito finché `MANCANTI.md` ha voci bloccanti; si resta su `*.workers.dev` finché non c'è la P.IVA.

## Immagini

- Manuel genera le illustrazioni con Gemini (1K, senza trasparenza, limite che si ricarica ogni 5 ore); prompt in `riferimenti/immagini/PROMPT.md`. Prima l'ufficio in ordine, poi lo stesso nel caos con composizione identica.
- Sorgenti in `riferimenti/immagini/` (non pubblicate); `node tools/prepara-immagini.mjs` scontorna dove serve, ritaglia, crea AVIF/WebP per telefono e computer e riporta i pesi.
- Finché mancano, segnaposto disegnati con la stessa composizione. Prima di pubblicare: condizioni d'uso commerciale e rimozione di eventuali filigrane.

## Consegna

- **Prima di ogni consegna: screenshot a 390 e 1440 px** (per le scene allo scroll anche a più profondità e a 0/50/100% delle sezioni pinnate), Lighthouse mobile, inspector di design-taste-frontend, fps misurati per la pioggia. Se un effetto esce sbagliato negli screenshot automatici, dirlo e chiedere verifica sul telefono.
- Versione 2 sul ramo `v2`, unita a `main` solo dopo approvazione. A fine fase: riepilogo breve (scelte minori, fonti, lavori con ripieghi), link di anteprima, screenshot, Lighthouse, `MANCANTI.md` aggiornato. Poi fermarsi.
- Un componente per file, nessun file oltre 500 righe. Cartelle: quelle della versione 1 più `src/components/scenes/` (pioggia di codice, riordino, transizioni di decodifica) e `riferimenti/immagini/`; nessun'altra cartella nuova senza dirlo. Aggiorna il README quando cambiano avvio, test o deploy.
