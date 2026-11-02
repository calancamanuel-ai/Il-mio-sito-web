# /impeccable critique: home della versione 1 (punto di partenza della v2)

⚠️ DEGRADED: rilevatore di impeccable non eseguito. Il programma (`impeccable detect`) andrebbe scaricato ed eseguito da GitHub Releases, e il controllo di sicurezza di questa sessione l'ha bloccato. Revisione di design (A) svolta da un agente separato; prove automatiche (B) raccolte con l'inspector di design-taste-frontend e Lighthouse al posto del rilevatore. 2 novembre 2026, build del ramo `v2` (home identica alla fase 4).

## Punteggio (euristiche di Nielsen)

| # | Euristica | Voto | Problema principale |
| --- | --- | --- | --- |
| 1 | Visibilità dello stato | 2 | Su telefono il risultato di "Costruisci" (tempo e prezzo) resta sotto 12 opzioni, fuori schermo mentre scegli |
| 2 | Linguaggio del mondo reale | 3 | Esempi concreti, ma "n8n", "Claude", "Trigger", "workflow" già nel sottotitolo dell'hero |
| 3 | Controllo e libertà | 2 | Gli interruttori del lunedì scattano da soli; il pin del 3D trattiene per il 160% di uno schermo |
| 4 | Coerenza | 2 | Sei etichette diverse per la stessa azione; lo stesso verde pieno per CTA, chip, interruttori e numeri |
| 5 | Prevenzione degli errori | 3 | I frammenti `data-ui` hanno finti pulsanti ("Approva e invia") che non fanno nulla |
| 6 | Riconoscere invece di ricordare | 3 | Su telefono in "Costruisci" bisogna ricordare le scelte per leggere il risultato |
| 7 | Flessibilità | n/a | Pagina di presentazione |
| 8 | Estetica e minimalismo | 2 | 18,6 schermi su telefono, 10 sezioni, lo stesso messaggio in 4 punti |
| 9 | Recupero dagli errori | 3 | Fallback statico e segnaposto visibili; poco da mettere alla prova |
| 10 | Aiuto | 3 | FAQ e "Dopo che mi scrivi" ci sono; "tempi di risposta" è ancora segnaposto |
| | **Totale** | **23/36 (64%)** | **Accettabile**: servono interventi significativi |

## Verdetto sulla specificità

Contenuti specifici, forma intercambiabile. Sono di Manuel e solo suoi "Il lunedì mattina", il preventivo della caldaia a Crevalcore, le incisioni del territorio e "Quando non conviene". La forma invece è quella di qualsiasi agenzia AI:
- nero con verde neon;
- un H2 enorme, contenuto, grande spazio, ripetuto per dieci sezioni;
- il 3D chiuso in un riquadro, come un oggetto incollato;
- cinque meccanismi di movimento scollegati: decodifica del titolo, pin del 3D, rotaia nel margine, interruttori automatici, entrate generiche.

Nessuno riprende il gesto dell'altro, e la rotaia, unico filo, sparisce sotto i 760 px.

**Prove automatiche** (inspector di design-taste-frontend, senza eccezioni attive):
- 1 errore, il monospace, che nel progetto è un'eccezione voluta;
- 6 avvisi:
  - 3 famiglie di caratteri, perché compare anche un Arial di ripiego nel finto sito dimostrativo;
  - 14 dimensioni di testo, quando ne bastano circa 5;
  - titoli con cambio di carattere a metà;
  - 1 sola immagine vera;
  - nessun video;
  - font diverso da quello consigliato dalla skill.

L'inspector conferma la revisione: troppe dimensioni di testo, poche immagini vere, pagina lunga (14,7 schermi a 1440 px, 44 titoli). Il conteggio di 1 immagine è più basso del reale: le incisioni sono più in basso, caricate dopo.

## Cosa funziona

1. **Il lunedì mattina.** Orari, attività barrate, "40 minuti restituiti": è già "dal disordine all'ordine" ed è il momento più forte della pagina.
2. **Trasparenza.** Prezzi "da", costi ricorrenti scritti, "Quando non conviene".
3. **"Costruisci la tua automazione".** Un'interazione utile che chiude con la call.

## Problemi prioritari

1. **[P0 per il lancio] Nessun pulsante porta da qualche parte.** Link di prenotazione, telefono e WhatsApp sono segnaposto (già in `MANCANTI.md`). Comando: `harden`.
2. **[P1] Il 3D è isolato e il movimento non ha una lingua.** È la causa dell'effetto template. Fix v2:
   - un solo gesto, il disordine che si ordina, ripreso da ogni sezione;
   - l'hero a tutta larghezza;
   - niente entrate generiche;
   - un collegamento tra le sezioni che esista anche su telefono.

   Comandi: `animate`, `overdrive`, `layout`.
3. **[P1] Pulsanti diluiti.** Sei etichette per la stessa azione, e il verde pieno ovunque. Su telefono WhatsApp vince su "Prenota". Fix:
   - un'etichetta sola;
   - colore pieno solo per la prenotazione;
   - Chiama e WhatsApp con lo stesso peso neutro.

   Comandi: `clarify`, `colorize`.
4. **[P1] Pagina troppo lunga e ripetitiva.** 18,6 schermi su telefono. Fix:
   - circa 6–7 momenti;
   - "Come lavoro" e "Dopo che mi scrivi" uniti;
   - un solo finale (oggi chiusura e un secondo "Prenota" gigante nel footer).

   Comando: `distill`.
5. **[P2] Interazioni principali.** Il lunedì si accende da solo, contro il suo titolo "Accendi gli interruttori". Su telefono il risultato di "Costruisci" non si vede mentre scegli. Comandi: `adapt`, `animate`.

## Persone

- **Jordan** (prima visita):
  - il titolo "Caos [striscia] flusso." non ha verbo;
  - "n8n" e "Claude" senza spiegazione;
  - finti pulsanti nei frammenti;
  - "Tocca un nodo" arriva dopo la scena.
- **Riley** (mette alla prova):
  - tornando su, gli interruttori restano accesi;
  - segnaposto proprio nel passaggio che deve rassicurare;
  - testo sotto 16 px su telefono (nodi della striscia 13 px, metadati 14–15 px);
  - etichette spente del 3D forse sotto AA.
- **Casey** (telefono, distratta):
  - 18,6 schermi;
  - WhatsApp più forte di "Prenota";
  - il pin del 3D blocca circa uno schermo con la scena piccola;
  - una fascia vuota prima del footer.

## Osservazioni minori

- Il pulsante della chiusura sta sospeso a metà su desktop.
- Il nodo della rotaia non è sempre allineato al titolo.
- "Quando non conviene" usa un peso 800, unico nella pagina.
- Il finto sito dimostrativo in Arial maiuscolo sembra un errore.
- La striscia dell'hero ha un raggio di 14 px in un sistema a raggio 0.
- La barra "Sito in costruzione" spinge giù l'hero.

## Domande

1. E se la home non mostrasse una macchina, ma fosse la macchina?
2. Se togliessi il colore pieno da tutto tranne il pulsante di prenotazione, sarebbe peggio?
3. Il momento in cui chi visita barra la propria attività noiosa è il picco: perché lo fa lo script al posto suo?

## Cosa porto nella v2

- **Tengo:**
  - il lunedì mattina come vocabolario del disordine (gli stessi compiti diventano i frammenti della pioggia);
  - carte e documenti come oggetti del caos;
  - il territorio;
  - prezzi "da", "Quando non conviene", la logica di "Costruisci".
- **Lascio:**
  - la scatola del 3D;
  - le entrate generiche;
  - gli interruttori automatici;
  - la rotaia solo desktop;
  - il doppio finale;
  - le sei etichette dei pulsanti.
