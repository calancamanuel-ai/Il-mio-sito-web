# Piano sito web — versione 2

2 novembre 2026 · Manuel

## Cosa cambia rispetto alla versione 1

La versione 1 ha prodotto un sito tecnicamente solido ma che sembra ancora un template: statico, piatto, con un 3D isolato e animazioni messe a caso. La versione 2 cambia il linguaggio visivo, non le fondamenta.

- **Restano valide**: stack (Astro su Cloudflare Workers), struttura delle cartelle, `src/config/sito.ts` con i segnaposto, `MANCANTI.md`, pagine legali, footer, SEO di base, endpoint del form con Turnstile e inoltro a n8n, palette, prezzi.
- **Cambiano**: concetto, sistema di movimento, home, aspetto di tutte le pagine, testi (orientati ai risultati), regole sulle skill.
- **Esce**: il 3D "La macchina del flusso" e la variante a parallasse in prova (`/lab/hero-livelli`). Dal lab si possono riusare lo script di elaborazione immagini e quello che funziona tecnicamente, non il concetto.
- **Metodo**: prima un prototipo dell'hero, verificato da Manuel sul telefono; solo dopo si rifà il resto.

## Obiettivo e pubblico

Il sito ha un solo compito: far prenotare una call conoscitiva di 20 minuti. Tutto il resto serve a convincere chi visita che il lavoro ripetitivo si può togliere di mezzo, e che Manuel sa farlo.

- **Pubblico**: si parte da titolari e responsabili di piccole imprese della zona Persiceto–Bologna–Modena, ma né il tipo di cliente né la zona sono un limite (professionisti, startup, aziende più grandi, anche da remoto). Persone non tecniche, molte da telefono.
- **Promessa**: dal disordine all'ordine. Meno tempo perso, meno errori, clienti che ricevono risposta subito, più calma.
- **Il sito è la prova**: deve dimostrare cosa si può fare, non descriverlo.
- **Brand**: nome da decidere, segnaposto. Progetto originale: nessun materiale, codice o stile ripreso da progetti precedenti.

## Concetto: dal disordine all'ordine

Tutto il sito racconta una sola storia: un ufficio sommerso dal lavoro ripetitivo diventa, passo dopo passo, un ufficio in ordine e tranquillo. Il visitatore la vive scorrendo.

**La scena principale (hero)**

- Un piccolo ufficio in sezione isometrica, come una casa delle bambole vista dall'alto, con i reparti come stanze: reception (telefono, WhatsApp, email), amministrazione (fatture, documenti), commerciale (preventivi), più eventuali stanze per vetrina online e software su misura.
- All'inizio è nel caos: carte ovunque, notifiche, telefono che squilla, pile di fogli.
- Allo scroll l'immagine si scompone in caratteri che cadono, una "pioggia di codice". I caratteri non sono lettere a caso ma frammenti veri del lavoro d'ufficio: "fattura n. 132", "richiamami", "preventivo urgente", oggetti di email, numeri di telefono, date di scadenza.
- I caratteri entrano nelle linee del circuito, attraversano i nodi (ricevi, capisci, archivia, avvisa), si ordinano in colonne e ricompongono lo stesso ufficio, ma calmo: luce calda, scrivanie in ordine, nessuna notifica.
- Le stanze dell'ufficio in ordine sono toccabili: ognuna apre il servizio corrispondente.

**L'arco di tutta la pagina**

- In alto il sito è "nervoso": più pioggia di codice, più movimento, più rumore visivo.
- Scorrendo diventa sempre più calmo. Vicino all'invito finale a prenotare la call è quasi immobile, luminoso e ordinato.
- Chi scorre vive esattamente quello che Manuel vende.

**Il circuito**

- Le linee del circuito sono il filo che collega le sezioni: escono dall'hero e accompagnano la pagina, portando "dati" da una sezione all'altra.

**Ispirazione, non citazione**

- L'effetto pioggia di codice è un linguaggio, non un omaggio a un film: niente pioggia verde di caratteri giapponesi, niente riferimenti a Matrix. Caratteri latini e numeri, parole del lavoro d'ufficio, colori della palette.

## Sistema di movimento

Il movimento è il linguaggio principale del sito, non una decorazione. Prima di costruire, scrivilo in `docs/MOVIMENTO.md` e applicalo ovunque.

**Tre stati, collegati alla posizione nella pagina**

| Stato | Dove | Come si muove |
| --- | --- | --- |
| Caos | Hero, inizio pagina | Pioggia di codice fitta, piccoli tremolii, elementi fuori posto, ritmo irregolare |
| Elaborazione | Sezioni centrali | Caratteri che scorrono lungo il circuito, si ordinano, si decodificano; ritmo regolare |
| Calma | Fine pagina, invito finale | Movimenti lenti e ampi, pochissimi caratteri, luce che si allarga |

**Regole comuni**

- Ogni sezione ha una sua scena legata al concetto; nessuna sezione statica, nessuna animazione uguale ripetuta ovunque.
- Le sezioni sono collegate da transizioni continue: la linea del circuito ed elementi che passano da una sezione all'altra.
- **Decodifica**: testi e immagini entrano come caratteri che si assestano nella forma finale. Il testo vero è nel DOM fin dall'inizio, leggibile dagli screen reader e da Google; l'effetto è solo visivo.
- **Cursore** (solo desktop): i caratteri che sfiora si ricompongono per un attimo in parole sensate.
- Si muovono composizione, oggetti, immagini e sfondi su livelli di profondità diversi, non solo le scritte.
- Transizioni dell'interfaccia (pulsanti, menu, stati): regole di Emil Kowalski, rapide, ease-out, sotto i 300 ms, pressione con scala 0,97.
- Scene allo scroll: GSAP con ScrollTrigger; su telefono sequenze bloccate (pin) corte o assenti, mai la sensazione di restare incastrati.
- Solo `transform` e `opacity` per l'HTML; la pioggia di codice in un solo `canvas`.

**Sicurezza e accessibilità**

- Mai più di 3 lampeggi al secondo, nessun flash a schermo intero.
- Con `prefers-reduced-motion`: niente pioggia di codice, niente decodifica; si vedono le immagini statiche (caos e ordine affiancati o in sequenza) e i testi subito.
- I testi restano sempre leggibili sopra gli effetti, con contrasto WCAG AA.

## Identità visiva

- **Palette**: quella attuale, che piace a Manuel. Base "Circuito": sfondo #0B1220, superfici #111A2E, bordi #1E2A44, testo #E6EDF7, testo secondario #94A3B8, azione ciano #22D3EE, secondario blu #3B82F6. Il verde #34D399 compare solo per lo stato "in ordine". Nello stato di calma la luce può scaldarsi (toni caldi nelle illustrazioni), senza cambiare i colori dell'interfaccia.
- **Tipografia**: un font da titoli con personalità (non Inter, Roboto o simili) e un monospace per la pioggia di codice, i dati e le etichette tecniche. Al massimo due famiglie, da npm (`@fontsource`).
- **Immagini**: illustrazioni isometriche generate con Gemini (vedi "Immagini e asset"), più frammenti di interfaccia realistici costruiti in HTML. Niente foto stock con persone.
- **Composizione**: ogni sezione con una composizione propria; niente griglie di card, blocchi testo+immagine ripetuti o layout da template.

## Architettura del sito

**Home, in ordine** (può cambiare nella proposta, purché segua l'arco caos → calma)

1. **Hero, il riordino**: l'ufficio nel caos che si scompone in pioggia di codice e si ricompone in ordine. Titolo e pulsante "Prenota una call" in HTML, visibili subito.
2. **Le stanze**: l'ufficio in ordine con le stanze toccabili. Per ogni stanza: cosa va storto oggi, cosa cambia dopo, in linguaggio di risultato. Ogni stanza porta alla pagina servizio.
3. **Costruisci la tua automazione**: la demo interattiva, con gli stessi caratteri e lo stesso circuito.
4. **Come lavoro**: call, analisi, prototipo, consegna, supporto, raccontati come un flusso che si ordina.
5. **Prezzi di lancio**: "da X €", con preventivo fisso dopo l'analisi gratuita.
6. **Quando non conviene automatizzare**: breve e onesta.
7. **FAQ e invito finale**: la parte più calma del sito; form o mini-diagnosi.

**Altre pagine**: Automazioni, Software su misura, Siti web, Casi d'uso, Chi sono, Contatti (con la mini-diagnosi), Privacy, Cookie, 404 ("un foglio fuori posto": l'unico angolo di caos rimasto, con il pulsante per tornare in ordine). Ogni pagina usa lo stesso linguaggio e ha una sua "cosa viva" (vedi Regole sulle skill).

**Su tutto il sito**: barra di stato in fondo, stile terminale, con dati veri o segnaposto; interruttore "vista tecnica" che mostra come è fatto il sito (è l'unico posto dove compaiono i nomi degli strumenti); barra fissa su telefono con "Chiama" e "WhatsApp"; footer con P.IVA, CF, REA (segnaposto), privacy e cookie.

## Testi

- Chi legge non è tecnico. Nelle sezioni principali niente nomi di strumenti (n8n, Claude, Astro e simili) e niente spiegazioni su come è strutturato il lavoro.
- Si parla di risultati: tempo recuperato, errori evitati, clienti che ricevono risposta subito, meno stress. Esempi concreti di situazioni d'ufficio.
- I dettagli tecnici solo nella vista tecnica, nelle FAQ e nelle pagine di approfondimento.
- Tono umano, diretto, un po' ironico; titoli al massimo 2 righe; solo italiano.
- Messaggi chiave di Manuel in `riferimenti/messaggi.md`; le bozze si marcano `[BOZZA]` finché non vengono approvate.
- Niente frasi fatte ("Trasforma il tuo business", "Soluzioni innovative", "Il futuro è adesso").

## Immagini e asset

Manuel genera le illustrazioni con Gemini (piano gratuito: immagini a 1K, senza sfondo trasparente, limite di generazione che si ricarica ogni 5 ore). Niente video generati: le transizioni le fa il codice.

- **Indispensabili**: l'ufficio in ordine e lo stesso ufficio nel caos, con composizione identica (si genera prima quello in ordine, poi lo si modifica in caos).
- **Utili**: un dettaglio per ogni stanza, nei due stati, se serve per le pagine servizio.
- Per ogni immagine prepara un prompt in italiano: stile isometrico in sezione, coerente con la palette, niente persone, niente testo, niente loghi. Per gli elementi da scontornare, sfondo uniforme di un colore assente nell'illustrazione.
- Uno script prende le immagini caricate in `riferimenti/immagini/`, le scontorna dove serve, le ritaglia, crea le versioni per telefono e computer in AVIF e WebP e riporta il peso di ciascuna.
- Finché le immagini non ci sono, usa segnaposto disegnati con la stessa composizione, per vedere già il movimento.
- Prima di pubblicare: controllo delle condizioni d'uso commerciale delle immagini generate e rimozione della filigrana visibile, se presente.

## Riferimenti studiati (solo tecniche, mai stile, testi o immagini)

- **Sito "SELENE" (allegato da Manuel)**: parallasse a livelli; 6 immagini sovrapposte che allo scroll si muovono a velocità diverse con zoom, sfocatura e dissolvenze; versioni separate per telefono e computer.
- **Sito "The Solenne" (reel Instagram)**: un viaggio continuo dal generale al dettaglio (edificio, piano in sezione isometrica, stanze) guidato da clic e scroll, con etichette informative; immagini e transizioni generate con l'AI, codice per i punti interattivi.
- **getartcraft.com**: il prodotto vero mostrato in azione al posto delle descrizioni.
- **Concorrenza italiana** (iaflux.it, performadigital.it, digitalsisofo.it, usanest.it, castaldosolutions.it, n8n.it) e **agenzie web locali**: tutte con lo stesso schema (promessa, costo del lavoro manuale, casi d'uso, metodo a fasi, prezzi "da", FAQ, "parliamone"), prove deboli, design anonimo, quasi nessuna demo dal vivo. Il nostro vantaggio: esperienza interattiva, concetto originale, demo vere.
- Se Manuel aggiunge link di siti di riferimento e i domini sono autorizzati, aprili con Playwright, fotografali a più posizioni dello scroll a 390 e 1440 px e descrivi le tecniche usate.

## Demo e mini-diagnosi

Il sito non descrive le automazioni: le fa provare.

| Demo | Dove | Cosa vede il visitatore | Cosa succede dietro |
| --- | --- | --- | --- |
| Costruisci la tua automazione | Home | Sceglie cosa arriva, cosa deve succedere e il risultato; vede il flusso animarsi con tempo risparmiato stimato e fascia di prezzo; invia la richiesta già compilata | Logica nel browser, prezzi da `src/config/sito.ts`; l'invio passa dall'endpoint del form |
| Calcolatore di risparmio | Automazioni | Sceglie il tipo di attività e le operazioni ripetitive, vede ore ed euro recuperati con le ipotesi scritte sotto | Logica nel browser; con consenso, il risultato via email |
| Simulazione WhatsApp | Software su misura | Una chat in cui un cliente chiede un preventivo e riceve risposta automatica | Costruita da zero, selettore per tipo di attività |
| Mini-diagnosi | Contatti | 5-6 domande in 2 minuti, poi i processi candidati all'automazione e la fascia di prezzo | Stesso endpoint del form; prenota la call o ricevi il risultato via email |

- Form e mini-diagnosi passano da un endpoint su Cloudflare Worker che verifica Turnstile lato server, limita gli invii per IP e poi inoltra a n8n (URL in variabile d'ambiente, mai nel codice).
- Mai risultati inventati; ogni demo finisce con "Vuoi questo per la tua attività? Prenota una call."

## Fiducia senza testimonianze

Per ora non ci sono clienti né testimonianze: la fiducia si crea con quello che c'è, senza inventare nulla.

- Una persona vera: foto di Manuel (segnaposto), tono diretto, consulente e non agenzia, il territorio da cui parte.
- Trasparenza: prezzi "da", preventivo fisso, cosa succede dopo il primo contatto e in quanto tempo.
- Onestà: la sezione "Quando non conviene automatizzare" (processi rari, che cambiano spesso, volumi troppo bassi, processi da sistemare prima di automatizzarli).
- Prova pratica: le demo e il sito stesso (velocità, cura, vista tecnica).
- Spazio pronto per testimonianze e casi veri, nascosto finché non ci sono; ogni numero di risultato futuro sarà collegato al suo caso studio.

## Portfolio (pagina Siti web)

- 2–3 progetti dimostrativi per attività inventate di settori diversi, dichiarati come tali, ognuno con uno stile proprio. Almeno uno sobrio e classico, curato e originale, per far capire che il sito di Manuel è una vetrina e non l'unico stile proposto.
- Presentati come casi studio brevi: brief, scelte di design e perché, cosa fa il sito per quell'attività, anteprima navigabile o immagini. Il lavoro prima del testo.

## Prezzi di lancio

| Servizio | Esempio | Prezzo di lancio |
| --- | --- | --- |
| Analisi iniziale | call di 30–45 minuti e proposta scritta | gratuita |
| Primo workflow semplice | richieste dal sito raccolte in un foglio, con avviso sul telefono | da 300 € |
| Workflow medio con AI | email di richiesta lette e trasformate in bozza di preventivo | da 1.000 € |
| Sito vetrina | 4–5 pagine, ottimizzato per telefono, SEO di base | da 600 € |
| Sito premium | esperienza interattiva come questo sito | da 1.500 € |
| Assistenza | controllo, aggiornamenti, piccole modifiche | da 30 € al mese |

- Frase: "Dopo l'analisi gratuita ricevi un preventivo a prezzo fisso, che non cambia in corso d'opera." Due righe su cosa fa variare il prezzo.
- Costi ricorrenti a parte, scritti chiaramente; "prezzo di lancio per i primi 5 clienti"; rimando ai voucher digitali camerali nelle FAQ.
- Le fasce stanno in `src/config/sito.ts`.

## SEO

- Ricerche concrete e locali come punto di partenza, pagine servizio valide anche fuori zona.
- Titolo e descrizione unici per pagina, Open Graph, sitemap, robots.txt, dati strutturati (`ProfessionalService`, `Service`, `FAQPage`), URL in italiano, testi alternativi.
- Il contenuto vero è sempre nell'HTML, anche quando l'effetto visivo lo "decodifica".
- `noindex` finché `MANCANTI.md` ha voci bloccanti.

## Requisiti legali

- Footer con nome, P.IVA, codice fiscale, REA se presente (segnaposto finché l'attività non è avviata).
- Privacy policy che copra form, demo, email e analytics; analytics senza cookie per evitare il banner; consenso esplicito e separato nei form.
- Crediti per font e immagini che li richiedono.
- Il sito resta su `*.workers.dev` con `noindex` finché non c'è la P.IVA.

## Prestazioni

Priorità: prima prestazioni e accessibilità, poi chiarezza e contatto, poi creatività. Il movimento non deve mai rendere il sito lento.

| Metrica | Obiettivo |
| --- | --- |
| Lighthouse mobile | almeno 90 in tutte le categorie |
| LCP | sotto 2,5 s su 4G lento (l'immagine statica dell'hero arriva subito, l'effetto parte dopo) |
| CLS | sotto 0,05 |
| INP | sotto 200 ms |
| Immagini hero | sotto 400 KB su telefono, 900 KB su computer, caricate in modo progressivo |
| JavaScript iniziale | sotto 80 KB compressi; il resto caricato quando serve |

- Pioggia di codice: un solo canvas, numero di colonne limitato, ferma quando non è visibile o la scheda è in background, versione più leggera su telefono.
- Test su un telefono di fascia media: 60 fps durante lo scroll.

## Regole sulle skill

Vale la regola di pro-design: il piano vince sulle skill. Se una skill chiede qualcosa che contraddice il piano, segui il piano e segnalalo nel riepilogo.

**Ruoli**

| Skill | Ruolo |
| --- | --- |
| pro-design | Regia: precedenze, controllo dei conflitti, ciclo di revisione (massimo 3 giri) |
| design-taste-frontend | Regole di stile, controllo automatico (inspector), critica sugli screenshot |
| impeccable | Critica e miglioramento: critique, audit, bolder, delight, overdrive, polish |
| skill di Emil Kowalski (animate, review-animations, improve-animations, break-ui) | Qualità del movimento dell'interfaccia e prove con dati estremi |
| gsap-scroll-animation | Codice delle scene allo scroll |
| playwright-cli | Test, screenshot, studio dei riferimenti |
| web-design-guidelines | Revisione finale |
| threejs-web-3d, sito-3d-premium | Non usate in questa versione (niente 3D) |

**Movimento come linguaggio (cambio rispetto alle skill)**

- Per questo sito non si applicano le regole che limitano le scene a 2–3 per pagina o chiedono di tenere tranquillo il resto della pagina. Ogni sezione ha la sua scena, dentro il sistema di movimento.
- La soglia minima di elementi in movimento di design-taste-frontend è ampiamente superata: va bene.
- Le regole di Emil valgono per le transizioni dell'interfaccia; le scene allo scroll seguono questo piano e gsap-scroll-animation.

**Eccezioni volute alle regole di stile di design-taste-frontend** (per queste sole regole `--allow` all'inspector, dichiarato nel report)

- **Monospace**: per la pioggia di codice, la decodifica, la barra di stato, la vista tecnica e le etichette dei nodi. Mai per il testo corrente.
- **Linee**: le linee del circuito, piene, almeno 2 px, colore piatto. Nessun'altra linea sottile, divisore o griglia decorativa.
- **Luce**: un leggero alone solo sui caratteri della pioggia e sui nodi attivi, dentro il canvas; nessun bagliore, ombra o gradiente nell'HTML.

**Una "cosa viva" per pagina**

| Pagina | Cosa viva |
| --- | --- |
| Home | Il riordino dell'ufficio con le stanze toccabili; "Costruisci la tua automazione" come seconda interazione nella sua sezione |
| Automazioni | Calcolatore di risparmio |
| Software su misura | Simulazione WhatsApp |
| Siti web | Casi studio dei progetti dimostrativi navigabili |
| Casi d'uso | Filtro per settore dei casi, presentati come registro di sistema |
| Chi sono | Mappa a circuito della zona di partenza, con piste che escono dai bordi |
| Contatti | Mini-diagnosi |

**Immagini per la soglia di design-taste-frontend**: le illustrazioni generate (immagini raster vere), i frammenti di interfaccia in HTML marcati `data-ui` e la foto di Manuel. Niente immagini trovate presentate come lavori propri.

**Processo**: gli stop di fase e le scelte richieste da Manuel prevalgono sulla regola "chiedi al massimo una volta". Stack del piano, non quelli degli esempi delle skill.

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

## Setup e regole di progetto

1. **Repository**: `Il-mio-sito-web` su GitHub; la versione 2 si sviluppa sul ramo `v2`, unito a `main` solo dopo l'approvazione.
2. **Skill nel repository** (`.claude/skills/`), dalle fonti ufficiali: impeccable (github.com/pbakaus/impeccable, cartella `.claude/skills/impeccable`) e da github.com/emilkowalski/skills: animate, review-animations, improve-animations, break-ui. Se il launcher di impeccable deve scaricare file da domini bloccati, dillo subito.
3. **CLAUDE.md**: aggiornalo con le regole di questo piano (priorità, sistema di movimento, eccezioni, regole sulle skill, testi orientati ai risultati, solo contenuti veri o segnaposto, screenshot a 390 e 1440 px prima di ogni consegna).
4. **Blocchi di rete**: se una richiesta viene bloccata, scrivi subito il dominio e a cosa serve. Nessun ripiego silenzioso: segna ogni lavoro fatto senza documentazione o con immagini sostituite, per rifarlo quando il dominio viene autorizzato.
5. **Ricerche online**: verifica sempre sulla documentazione ufficiale versioni e configurazioni (Astro, wrangler e Cloudflare Workers, GSAP, Lenis); elenca le fonti nel riepilogo.
6. **3D in WebGL**: non serve più; rimuovi three.js e i relativi asset se non usati.
7. **Struttura delle cartelle**: quella della versione 1, con in più `src/components/scenes/` (pioggia di codice, riordino, transizioni di decodifica) e `riferimenti/immagini/` (immagini di Gemini, non pubblicate). Un componente per file, nessun file oltre le 500 righe.
8. **Segnaposto**: dati mancanti in `src/config/sito.ts` come `[DA COMPLETARE: ...]`, elencati in `MANCANTI.md` con dove compaiono e se bloccano il lancio.

## Roadmap della versione 2

Ogni fase finisce con uno stop: riepilogo breve (scelte minori, fonti, lavori fatti con ripieghi), link di anteprima, screenshot a 390 e 1440 px, Lighthouse mobile, `MANCANTI.md` aggiornato. Si aspetta l'ok di Manuel.

1. **Fase A, preparazione**: ramo `v2`; sostituisci `docs/PIANO.md` con questa versione; chiudi il lab della parallasse riusando ciò che serve; installa le skill; aggiorna `CLAUDE.md`; scrivi la bozza di `docs/MOVIMENTO.md`; esegui `/impeccable critique` sulla home attuale come punto di partenza; prepara i prompt per Gemini e dimmi quante immagini servono. Proponimi in breve come intendi realizzare il riordino (tecnica per scomporre l'immagine in caratteri e ricomporla, uso del canvas, versione telefono).
2. **Fase B, prototipo**: solo l'hero, su `/lab/riordino`, prima con segnaposto e poi con le immagini di Manuel. Caos → pioggia di codice → circuito → ordine, stanze toccabili, versione telefono, versione con movimento ridotto, pesi e fps misurati. Stop: Manuel lo guarda dal telefono.
3. **Fase C, home**: tutta la home con il sistema di movimento e l'arco caos → calma, testi orientati ai risultati.
4. **Fase D, altre pagine**: pagine servizio, siti web (portfolio), casi d'uso, chi sono, contatti, 404, con lo stesso linguaggio.
5. **Fase E, demo e collegamenti**: demo, mini-diagnosi, endpoint Worker con Turnstile e inoltro a n8n, test con Playwright inclusi errori e spam simulato.
6. **Fase F, revisione e lancio**: `/impeccable critique`, `audit` e `polish`; `improve-animations` e `review-animations`; `break-ui` sulle demo; ciclo Playwright; SEO; web-design-guidelines. `noindex` tolto solo quando `MANCANTI.md` non ha voci bloccanti.

## Cosa deve preparare Manuel

- [ ] Immagini con Gemini, seguendo i prompt della fase A (prima l'ufficio in ordine, poi lo stesso nel caos), caricate in `riferimenti/immagini/`.
- [ ] 4–5 messaggi chiave in `riferimenti/messaggi.md`.
- [ ] Una foto vera per "Chi sono".
- [ ] Eventuali link di siti di riferimento, con i domini autorizzati nell'ambiente.
- [ ] Nome del brand e dominio; dati fiscali quando l'attività è avviata.
- [ ] Link per prenotare la call e numero WhatsApp Business.
- [ ] Decidere se tenere il riquadro "chiedi al sito" con l'AI (ha un costo per domanda).

## Fonti

- [Vercel – Terms of Service](https://vercel.com/terms)
- [Flavio Copes – Cloudflare Pages vs Workers](https://flaviocopes.com/cloudflare-pages-vs-workers/)
- [Astro – Deploy su Cloudflare](https://v5.docs.astro.build/ar/guides/deploy/cloudflare/)
- [Cloudflare – Proteggere i form da spam e abusi](https://developers.cloudflare.com/use-cases/solutions/protect-sensitive-forms-fraud-abuse/index.md)
- [Impeccable (pbakaus)](https://github.com/pbakaus/impeccable)
- [Skill di Emil Kowalski](https://github.com/emilkowalski/skills)
- [Taste Skill (Leonxlnx)](https://github.com/Leonxlnx/taste-skill)
- [LaoZhang – Limiti delle immagini gratuite di Gemini](https://blog.laozhang.ai/en/posts/gemini-image-generation-free-limit-2026.md)
- [LaoZhang – Gemini e sfondi trasparenti](https://blog.laozhang.ai/en/posts/gemini-image-background-change.md)
- [Usanest – Consulenza n8n in Italia](https://usanest.it/blog/consulenza-n8n-italia)
- [Contin Digital – Costi n8n](https://www.contindigital.it/blog/n8n-automazione-processi-aziendali-guida)
- [Diritto.it – Obbligo P.IVA sul sito](https://www.diritto.it/l-indicazione-della-partita-iva-sul-sito-web-e-obbligatoria/)
- [Legiscope – Linee guida cookie del Garante](https://www.legiscope.com/blog/cookie-linee-guida-garante.html)
- [Camera di Commercio di Bologna – Voucher digitali I4.0](https://www.bo.camcom.gov.it/it/node/3338)
