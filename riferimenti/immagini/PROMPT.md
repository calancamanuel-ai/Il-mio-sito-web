# Prompt per Gemini (versione 2)

## Riferimenti studiati (solo per lo stile: non vanno nel sito e non si copiano)

Trovati con Openverse il 3 novembre 2026. Da ognuno prendo solo un'idea di composizione o di dettaglio.

| # | Riferimento | Licenza | Cosa prendo |
| --- | --- | --- | --- |
| 1 | [Low Poly Isometric Rooms](https://sketchfab.com/3d-models/d53af0ad289a403598ee2cb41d84608b) | CC BY 4.0 | Più stanze come blocchi affiancati con le pareti tagliate su due lati: l'ufficio "casa delle bambole" |
| 2 | [Low Poly Room](https://sketchfab.com/3d-models/a6bf7976f3ac401e96907aa5b8a0c1c1) | CC BY 4.0 | Una stanza sola su una lastra di pavimento con lo spessore visibile: il modello dei dettagli delle stanze |
| 3 | [Low Poly Isometric Bathroom](https://sketchfab.com/3d-models/12b69f5f17f542d0a61c1f9b628c20d2) | CC BY 4.0 | La base che "galleggia" sul fondo, con un bordo netto: facile da ritagliare |
| 4 | [Aerial View of Messy Cubicle](https://www.flickr.com/photos/31437555@N00/1950406926) | CC BY-ND 2.0 | Il caos visto dall'alto: carte che coprono il piano e debordano dai bordi della scrivania |
| 5 | [World's Messiest Office Cubicle](https://www.flickr.com/photos/31437555@N00/1950409800) | CC BY-ND 2.0 | Pile che franano sulla tastiera, buste e cartelline aperte |
| 6 | [Messy Desk](https://www.flickr.com/photos/71539256@N00/357361903) | CC BY 2.0 | Monitor circondato da oggetti, post-it e scatole: la reception nel caos |
| 7 | [my messy desk…](https://www.flickr.com/photos/41808955@N00/1225208026) | CC BY 2.0 | Scrivania con due monitor e cavi aggrovigliati: il laboratorio software nel caos |

**Fonti che non ho potuto usare.**
- Wikimedia Commons risponde "troppe richieste" (429).
- Art Institute of Chicago chiede una verifica anti-bot (403).
- Met: la vecchia API di ricerca è stata ritirata il 1° ottobre 2026; con la nuova non ho trovato interni d'ufficio utili.
- Le immagini di Flickr e Sketchfab le ho viste tramite le miniature di Openverse, perché `live.staticflickr.com`, `www.flickr.com`, `sketchfab.com` e `media.sketchfab.com` sono bloccati dal filtro di rete.

## Quante immagini servono

| Quando | Immagini | Nomi file | Servono per |
| --- | --- | --- | --- |
| **Fase B/C, indispensabili (4)** | ufficio in ordine, ufficio nel caos, dettaglio reception, dettaglio amministrazione | `ufficio-ordine`, `ufficio-caos`, `stanza-reception`, `stanza-amministrazione` | Hero (riordino) e sezione "Le stanze": la home deve avere almeno 4 immagini vere |
| Facoltativa, prima di tutto (1) | prova di stile su una stanza | `_prova-stile` (il trattino basso dice allo script di ignorarla) | Decidere lo stile senza sprecare tentativi |
| Fase D, più avanti (fino a 7) | le altre 3 stanze, le versioni "nel caos" dei dettagli, il foglio della 404 | — | Pagine servizio e 404 |

**Adesso: 4 immagini**, più una facoltativa. Ordine: 1 → 2 → 3 → 4.

## Regole per tutte

- **Formato**: quadrato **1:1**. Funziona sia su telefono sia su computer, e le stanze toccabili restano negli stessi punti.
- **Ordine**:
  - Prima l'**ufficio in ordine**.
  - Poi, nella stessa chat, allega quell'immagine e chiedi la versione nel caos: l'inquadratura resta identica, ed è indispensabile perché i caratteri si ricompongono cella per cella.
  - I dettagli delle stanze si chiedono allegando l'ufficio in ordine.
- Niente persone, niente testo, niente loghi, niente filigrane.
- Salva in `riferimenti/immagini/` con i nomi della tabella (png o jpg), poi lancia `node tools/prepara-immagini.mjs`.
- Se Gemini scrive lettere su fogli o schermi, rigenera aggiungendo: "Ogni scritta è solo una barra piena arrotondata: nessuna lettera, nessun numero".

**Palette nei prompt**: "Circuito", scelta da Manuel il 3 novembre 2026. Nelle illustrazioni:
- fondo blu notte #0b1220, pareti e pavimenti blu ardesia #111a2e e #1e2a44;
- chiaro #e6edf7, grigio blu #94a3b8;
- blu #3b82f6 per piste del circuito e schermi;
- verde #34d399 solo per ciò che è "in ordine" (nelle illustrazioni solo le piante: niente spunte, puntini o etichette verdi; il verde dell'"in ordine" lo aggiunge il sito);
- luce calda ambrata solo nell'ordine.

Il ciano #22d3ee resta riservato ai pulsanti del sito: non compare nelle illustrazioni.

---

## 0. Prova di stile (facoltativa)

```
Illustrazione isometrica in sezione, vista dall'alto a 30°, come una casa delle bambole tagliata: una sola stanza di un piccolo ufficio italiano, la reception, su una lastra di pavimento con lo spessore visibile e due pareti tagliate, con un bancone, un telefono fisso, uno schermo, una pianta, una sedia. Stile illustrazione vettoriale pulita con piccoli dettagli, contorni sottili scuri, ombre piatte, leggera grana. La stanza galleggia al centro su un fondo blu notte uniforme #0b1220. Colori: pavimento e pareti in blu ardesia #111a2e e #1e2a44, mobili chiari #e6edf7 e legno caldo, accenti blu #3b82f6, una pianta verde #34d399, luce di una lampada calda. Ordinata e tranquilla. Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo.
```

## Struttura dell'ufficio (decisa il 3 novembre 2026)

Si legge dal davanti (l'angolo in basso, il più vicino a chi guarda) verso il fondo, nell'ordine dei nodi del circuito:

| Dove | Stanza | Nodo |
| --- | --- | --- |
| Angolo in basso, davanti | Reception con l'ingresso | Ricevi |
| Centro | Commerciale | Capisci |
| In fondo a sinistra, contro la parete con la finestra | Amministrazione | Archivia |
| Lato sinistro | Vetrina online: un grande schermo su piedistallo, senza scrivania | ramo laterale |
| In fondo a destra | Laboratorio software | ramo laterale |
| Lato destro, vicino all'ingresso | Sala d'attesa | — |

L'ultimo nodo, "avvisa", torna verso l'angolo in basso, dove la pista esce dalla lastra e continua nella pagina.

## 1. Ufficio in ordine (da zero, postazione per postazione)

Le correzioni a catena non funzionano: a ogni modifica Gemini sposta altro. Si riparte da zero con una pianta precisa e si allega `_ordine-candidata.jpg` **solo come riferimento di stile e di guscio**. Conviene generare 2–3 versioni con lo stesso prompt e scegliere la migliore; dopo, al massimo una correzione con una sola modifica alla volta.

**Come si legge la pianta.** Il pavimento è un rombo visto dall'alto, con quattro angoli:
- in basso: davanti, il più vicino a chi guarda;
- a sinistra;
- a destra;
- in alto: in fondo, dove ci sono le finestre.

```
Usa l'immagine allegata solo come riferimento di stile, colori, luce e guscio esterno: stessa inquadratura isometrica dall'alto a 30°, stessa lastra di pavimento con lo spessore visibile, stesse pareti esterne di mattoni tagliate, due finestre con luce calda sulle pareti di fondo, stesso fondo blu notte uniforme #0b1220. Non copiare la disposizione interna: ridisegnala da zero secondo questa pianta.

Il pavimento è un rombo con quattro angoli: davanti (in basso, il più vicino a chi guarda), a sinistra, a destra e in fondo (in alto). L'interno è diviso in cinque zone da pareti basse a mezza altezza, ognuna riconoscibile a colpo d'occhio:

INGRESSO E RECEPTION, nell'angolo davanti. Sul bordo destro della lastra, vicino all'angolo davanti, c'è un gradino d'ingresso con uno zerbino liscio. Chi entra trova alla sua sinistra il bancone della reception, curvo, messo di lato: perpendicolare al gradino d'ingresso, con il lato lungo rivolto verso il passaggio. Dietro il bancone, dal lato della parete, una sola sedia girevole per la receptionist, rivolta verso il passaggio. Sul bancone un computer con monitor e tastiera rivolto verso la sedia, un telefono fisso e un tablet. Alla destra di chi entra, separata dal bancone da un passaggio libero, una piccola sala d'attesa: due poltroncine rivolte verso il bancone, un tavolino basso e una pianta.

COMMERCIALE, al centro. Un tavolo con due sedie una di fronte all'altra, un portatile aperto e una cartellina chiusa. Dietro, una lavagna bianca vuota su un pannello.

AMMINISTRAZIONE, nell'angolo in fondo, contro le pareti con le finestre. Una scrivania con un computer, una lampada accesa e un raccoglitore aperto con i fogli allineati, una sedia girevole dietro la scrivania. Una libreria con faldoni tutti uguali in fila, senza simboli né etichette, e una stampante su un mobiletto.

VETRINA ONLINE, nell'angolo a sinistra. Una scrivania con un grande monitor. La sedia è davanti alla scrivania, dal lato verso chi guarda, e il monitor è rivolto verso la sedia, quindi lo schermo si vede: una pagina di negozio online fatta solo di blocchi colorati (un'immagine grande, tre riquadri di prodotto, un pulsante). Una pianta in vaso.

LABORATORIO SOFTWARE, nell'angolo a destra. Una scrivania con due monitor. La sedia è davanti alla scrivania, dal lato verso chi guarda, e i due monitor sono rivolti verso la sedia, quindi gli schermi si vedono: righe colorate come codice, fatte solo di barre. Accanto, un piccolo server ordinato con i cavi raccolti.

CIRCUITO. Sul pavimento corrono sottili piste luminose blu #3b82f6 come quelle di un circuito stampato: partono dal gradino d'ingresso, passano sotto il bancone della reception, attraversano il commerciale e arrivano all'amministrazione, con un ramo verso la vetrina e uno verso il laboratorio. Lungo il percorso ci sono quattro piccoli nodi quadrati. Una pista torna verso l'ingresso e scende dal bordo della lastra.

Ogni sedia è rivolta verso la sua scrivania o il suo bancone. Tutto è in perfetto ordine, luce calda di fine giornata dalle finestre e dalle lampade, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa.
Colori: pareti e pavimenti in blu ardesia #111a2e e #1e2a44, mobili chiari #e6edf7 e legno caldo, grigio blu #94a3b8 per i dettagli, blu #3b82f6 per le piste e gli schermi, piante verdi; nessun altro segno verde (niente spunte, puntini o etichette verdi).
Formato quadrato 1:1. Niente persone. Nessuna lettera, nessun numero e nessuna parola da nessuna parte, nemmeno sugli schermi e sullo zerbino: ogni scritta è solo una barra piena arrotondata. Nessun logo, nessuna filigrana.
```

**Come controllare il risultato, postazione per postazione:**
- **Reception:** bancone di lato rispetto al gradino, una sola sedia dietro, poltroncine separate dal bancone.
- **Vetrina e laboratorio:** la sedia è dal nostro lato e si vedono gli schermi.
- **Libreria:** nessuna etichetta e nessun simbolo sui faldoni.
- **Testo:** nessuna lettera da nessuna parte.

## 1d. Rifinitura della candidata 3 (allegando `_ordine-candidata-3.jpg`, una modifica alla volta)

La candidata 3 è la base scelta il 3 novembre:
- il laboratorio software è in fondo a destra;
- la sala d'attesa è a destra dell'ingresso;
- la reception è davanti;
- l'amministrazione è in fondo a sinistra.

**Passaggio A: togliere tutti i segni verdi**
```
Modifica l'immagine allegata cambiando una sola cosa: togli tutti i segni verdi che non sono piante, cioè le due spunte verdi sulla libreria in fondo (sui faldoni e sulle scatole) e i puntini verdi sul bancone della reception accanto al tablet. I faldoni restano tutti uguali, senza simboli né etichette; lo schermo del tablet resta acceso, azzurro chiaro, senza icone. Tutto il resto resta identico: stessa inquadratura, stessi mobili nella stessa posizione, stesso stile. Formato quadrato 1:1. Nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

**Passaggio B: vetrina online come schermo** (allegando il risultato del passaggio A)
```
Modifica l'immagine allegata cambiando una sola cosa: nella postazione sul lato sinistro togli la scrivania e la sedia; al loro posto metti un grande schermo verticale su un piedistallo, come una vetrina digitale, rivolto verso chi guarda e verso l'ingresso, con una pagina di negozio online fatta solo di blocchi colorati: un'immagine grande, tre riquadri di prodotto, un pulsante. La pianta accanto resta. Tutto il resto resta identico: stessa inquadratura, stessi mobili nella stessa posizione, stesse piste blu, stesso stile. Formato quadrato 1:1. Nessuna lettera, nessun numero e nessuna parola sullo schermo: ogni scritta è solo una barra piena arrotondata. Nessun logo, nessuna filigrana.
```

**Passaggio C: il computer della reception** (allegando il risultato del passaggio B)
```
Modifica l'immagine allegata cambiando una sola cosa: sul bancone della reception, davanti alla sedia della receptionist, aggiungi un computer con monitor e tastiera, con lo schermo rivolto verso la sedia. Il telefono fisso e il tablet restano dove sono. Tutto il resto resta identico: stessa inquadratura, stessi mobili nella stessa posizione, stesse piste blu, stesso stile. Formato quadrato 1:1. Nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 2. Ufficio nel caos (nella stessa chat, allegando la nuova immagine 1)

```
Modifica l'immagine allegata mantenendo esattamente la stessa inquadratura, la stessa prospettiva, le stesse pareti, gli stessi mobili nella stessa posizione e lo stesso stile. Cambia solo lo stato dell'ufficio: ora è sommerso dal lavoro ripetitivo.
Visto dall'alto, le carte coprono i piani delle scrivanie e debordano oltre i bordi; pile di fogli instabili che franano sulle tastiere, raccoglitori aperti e caduti, cartelline aperte, buste strappate, post-it gialli attaccati intorno agli schermi, scatole aperte, una stampante che sputa fogli sul pavimento, il telefono della reception con la cornetta staccata, sugli schermi tanti piccoli riquadri di notifica rossi e arancioni, tazze di caffè vuote, cavi aggrovigliati dietro le scrivanie. Davanti all'ingresso, sullo zerbino, una pila di buste e pacchi non aperti.
Luce fredda e un po' piatta di neon, niente luce calda. Stessi colori di base (#0b1220, #111a2e, #1e2a44, #e6edf7), nessun verde, con in più rosso e arancione solo per le notifiche e giallo per i post-it.
Le sedie e i mobili restano esattamente dove sono nell'immagine allegata, alcune sedie girate o spostate di poco. Le piste blu sul pavimento sono spente: grigie, senza luce, coperte di carte.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 3. Dettaglio: la reception in ordine (allegando la nuova immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo la reception di quell'ufficio, quella nell'angolo in basso vicino all'ingresso, ingrandita: gli stessi mobili, in isometria vista dall'alto a 30°. Non disegnare il guscio dell'ufficio intero né le altre stanze: inquadra solo questa stanza da vicino, come un ingrandimento, con la lastra di pavimento tagliata ai bordi della stanza, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Bancone alto e curvo pulito, telefono fisso con la cornetta al suo posto, un computer con monitor e tastiera, un tablet, una sedia dietro il bancone, due poltroncine d'attesa, lo zerbino dell'ingresso, un vassoio con tre buste impilate, una pianta. Una pista luminosa blu #3b82f6 entra dal bordo della lastra e passa sotto il bancone. Luce calda di lampada, atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, piante verdi.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

## 4. Dettaglio: l'amministrazione in ordine (allegando la nuova immagine 1)

```
Usa l'immagine allegata come riferimento di stile, colori e luce. Disegna solo l'amministrazione di quell'ufficio, quella in fondo contro le pareti con le finestre, ingrandita: gli stessi mobili, in isometria vista dall'alto a 30°. Non disegnare il guscio dell'ufficio intero né le altre stanze: inquadra solo questa stanza da vicino, come un ingrandimento, con la lastra di pavimento tagliata ai bordi della stanza, che galleggia al centro su un fondo blu notte uniforme #0b1220.
Scrivania con un raccoglitore aperto e i fogli allineati, una sedia, scaffali con faldoni tutti uguali in fila, senza simboli né etichette, una stampante spenta con un solo foglio nel vassoio, uno schermo con una tabella fatta di righe colorate, una finestra con luce calda, una lampada accesa. Una pista luminosa blu #3b82f6 entra dal bordo della lastra e arriva allo scaffale. Atmosfera calma.
Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. Colori: #111a2e, #1e2a44, #e6edf7, #94a3b8, legno caldo, blu #3b82f6, piante verdi.
Formato quadrato 1:1. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.
```

**Prima di caricare**:
- La reception deve stare davanti, nell'angolo in basso, e ogni scrivania deve avere la sua sedia.
- Guarda le immagini 1 e 2 una dopo l'altra: guscio, pareti, mobili e sedie devono stare negli stessi punti. Se Gemini ha spostato qualcosa, rigenera la 2 aggiungendo "stessa identica inquadratura dell'immagine allegata". Allineamento e sagoma li verifico io.
- I dettagli 3 e 4 si generano solo dopo la nuova immagine 1. Devono essere ingrandimenti di quella stanza, non l'ufficio intero.
- Le immagini attuali (prima versione) restano finché non arrivano le nuove: vanno sostituite con gli stessi nomi.
