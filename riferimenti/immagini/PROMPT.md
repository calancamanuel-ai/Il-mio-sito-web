# Prompt per Gemini (versione 2)

## Quante immagini servono

| Quando | Immagini | Servono per |
| --- | --- | --- |
| **Fase B (prototipo dell'hero)** | **2, indispensabili**: ufficio in ordine e ufficio nel caos | Il riordino in home |
| Prova di stile, facoltativa | 1 prima delle due (una stanza sola, per decidere lo stile senza consumare tentativi sull'ufficio intero) | Solo per scegliere |
| Fase D (pagine servizio), più avanti | Fino a 10: 5 stanze × 2 stati, scontornate | Dettagli nelle pagine Automazioni, Software, Siti web |
| Fase D, 404 | 1: "il foglio fuori posto", scontornato | Pagina 404 |

**Adesso ne servono solo 2** (3 se vuoi la prova di stile). Le altre le preparo quando arriviamo alla fase D.

## Regole per tutte

- **Formato**: quadrato **1:1** (1024 × 1024). Lo stesso quadrato funziona su telefono e computer, e le stanze toccabili restano negli stessi punti in tutte e due le versioni.
- **Ordine di generazione**: prima l'**ufficio in ordine**. Poi, nella stessa chat, allega quell'immagine e chiedi la versione nel caos: così l'inquadratura resta identica, ed è indispensabile perché i caratteri si ricompongono pixel per pixel.
- Niente persone, niente testo, niente loghi, niente filigrane.
- Salva in `riferimenti/immagini/` con questi nomi: `ufficio-ordine.png` e `ufficio-caos.png`. Poi lancia `node tools/prepara-immagini.mjs`.
- Se Gemini scrive lettere su fogli o schermi, rigenera aggiungendo: "Ogni scritta è solo una barra piena arrotondata: nessuna lettera, nessun numero".

**Palette nei prompt**: uso quella indicata nel piano v2, "Circuito": blu notte #0B1220, superfici #111A2E e #1E2A44, chiaro #E6EDF7, ciano #22D3EE, blu #3B82F6, verde #34D399 solo per ciò che è in ordine. Se scegli di restare sulla palette verde attuale, cambio solo questa riga dei prompt.

---

## 0. Prova di stile, facoltativa (1:1)

> Illustrazione isometrica in sezione, vista dall'alto a 30°, come una casa delle bambole tagliata: una sola stanza di un piccolo ufficio italiano, la reception, con un bancone, un telefono fisso, uno schermo, una pianta, una sedia. Stile illustrazione vettoriale pulita con piccoli dettagli, contorni sottili scuri, ombre piatte, leggera grana. Stanza sospesa su un fondo blu notte uniforme #0B1220. Colori: pavimento e pareti in blu ardesia #111A2E e #1E2A44, mobili chiari #E6EDF7 e legno caldo, accenti ciano #22D3EE e blu #3B82F6, luce di una lampada calda. Ordinata e tranquilla. Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo.

## 1. Ufficio in ordine (1:1) — da generare per primo

> Illustrazione isometrica in sezione, vista dall'alto a 30°, come una casa delle bambole tagliata: un piccolo ufficio italiano su un solo piano, diviso in cinque stanze ben distinte da pareti basse, ognuna riconoscibile dagli oggetti:
> 1. in alto a sinistra la **reception**: bancone, telefono fisso, tablet, un piccolo schermo;
> 2. in alto a destra l'**amministrazione**: scrivania con raccoglitori allineati, uno scaffale con faldoni in fila, una stampante;
> 3. al centro il **commerciale**: tavolo con due sedie e un portatile aperto, una lavagna bianca vuota;
> 4. in basso a sinistra la **vetrina online**: una scrivania con un grande monitor e un tablet su un supporto;
> 5. in basso a destra il **laboratorio software**: una scrivania con due monitor e un piccolo server ordinato.
> Tra le stanze, sul pavimento, corrono sottili piste luminose ciano come quelle di un circuito stampato, che collegano le stanze a quattro piccoli nodi quadrati.
> Tutto è in perfetto ordine: scrivanie sgombre, fogli impilati con cura, cavi nascosti, piante curate. Luce calda di fine giornata dalle finestre, lampade accese, atmosfera calma.
> Stile illustrazione vettoriale pulita e dettagliata, contorni sottili scuri, ombre piatte, leggera grana di stampa. L'ufficio occupa il centro dell'immagine con un margine intorno, su un fondo blu notte uniforme #0B1220.
> Colori: pareti e pavimenti in blu ardesia #111A2E e #1E2A44, mobili chiari #E6EDF7 e legno caldo, accenti ciano #22D3EE e blu #3B82F6, piccoli tocchi verdi #34D399 sugli oggetti "a posto" (spunte sulle cartelle, piante), luce calda ambrata dalle lampade.
> Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.

## 2. Ufficio nel caos (1:1) — allegando l'immagine 1

> Modifica l'immagine allegata mantenendo **esattamente** la stessa inquadratura, la stessa prospettiva, le stesse pareti, gli stessi mobili nella stessa posizione e lo stesso stile. Cambia solo lo stato dell'ufficio: ora è sommerso dal lavoro ripetitivo.
> Fogli sparsi ovunque sul pavimento e sulle scrivanie, pile di carte instabili, raccoglitori aperti e caduti, post-it gialli attaccati dappertutto, buste aperte, una stampante che sputa fogli, il telefono della reception con la cornetta staccata, sugli schermi tanti piccoli riquadri di notifica rossi e arancioni, tazze di caffè vuote, cavi aggrovigliati. Le piste ciano sul pavimento sono spente e coperte di carte, i nodi spenti.
> Luce fredda e un po' piatta di neon, niente luce calda. Stessi colori di base (#0B1220, #111A2E, #1E2A44, #E6EDF7), con in più rosso e arancione solo per le notifiche e giallo per i post-it.
> Niente persone, nessun testo, nessuna lettera, nessun numero, nessun logo, nessuna filigrana.

**Controllo prima di caricare**: sovrapponi le due immagini (o guardale una dopo l'altra). Pareti, scrivanie e finestre devono stare negli stessi punti. Se Gemini ha spostato la stanza o cambiato l'angolo, rigenera la 2 ricordandogli "stessa identica inquadratura dell'immagine allegata".

---

## Per la fase D (da non generare adesso)

Stessa apertura per ogni stanza: "Usa l'immagine allegata (ufficio in ordine) come riferimento di stile e di colori. Solo la stanza X, isolata, in isometria, su fondo magenta pieno #FF00FF uniforme fino ai bordi, senza ombre sul fondo." Poi la versione nel caos della stessa stanza. Il magenta non compare in nessuna illustrazione, quindi lo script lo toglie senza toccare i colori.
