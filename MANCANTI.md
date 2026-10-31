# Dati mancanti

Tutti i valori stanno in `src/config/sito.ts` come `"[DA COMPLETARE: ...]"`. Finché c'è almeno una voce **bloccante**, il sito resta su `*.workers.dev` con `noindex`.

Ultimo aggiornamento: fine fase 2 (31 ottobre 2026).

## Bloccano il lancio

| Cosa manca | Dove compare | Chiave in `sito.ts` |
| --- | --- | --- |
| Nome del brand | Header, footer, titoli delle pagine, privacy | `brand.nome` |
| Dominio | Indirizzo pubblico, canonical, sitemap, email | `sito.dominio` |
| Nome o ragione sociale | Footer di ogni pagina, privacy | `datiLegali.ragioneSociale` |
| Partita IVA | Footer di ogni pagina (obbligatoria anche in home) | `datiLegali.partitaIva` |
| Codice fiscale | Footer di ogni pagina, privacy | `datiLegali.codiceFiscale` |
| Numero REA (se ditta individuale) | Footer di ogni pagina | `datiLegali.rea` |
| Sede legale | Footer, privacy (titolare del trattamento) | `datiLegali.sedeLegale` |
| Email di contatto | Footer, privacy, pagina contatti | `contatti.email` |
| Link per prenotare la call | Tutti i pulsanti "Prenota una call" | `contatti.linkPrenotazione` |
| Numero WhatsApp Business | Barra mobile, pagina contatti | `contatti.whatsapp` |
| Numero di telefono | Barra mobile "Chiama" | `contatti.telefono` |
| Tempi di risposta dopo il primo contatto | Come lavoro, contatti, conferma del form | `contatti.tempoRisposta` |
| Testi privacy e cookie controllati dal commercialista/legale | `/privacy`, `/cookie` | — (testi in bozza) |
| Scelta analytics (Cloudflare Web Analytics o Plausible) | Privacy, cookie | `contenuti.analytics` |
| URL webhook n8n (variabile d'ambiente, mai nel codice) e endpoint `/api/contatto` | Form di contatto: oggi valida i campi ma l'invio risponde "non ancora attivo" (fase 5) | `contenuti.webhookN8n` |
| Chiave Cloudflare Turnstile | Form di contatto (fase 5) | `contenuti.turnstileSiteKey` |

## Non bloccano il lancio (ma servono)

| Cosa manca | Dove compare | Chiave in `sito.ts` |
| --- | --- | --- |
| 4–5 messaggi chiave in `riferimenti/messaggi.md` | Tutti i testi: oggi sono bozze scritte dal piano (avviso giallo in cima a ogni pagina) | `contenuti.messaggiChiave` |
| Cognome di Manuel | Chi sono, privacy | `brand.cognomeTitolare` |
| Testi "Chi sono" | `/chi-sono` | `contenuti.testoChiSono` |
| Foto vera di Manuel | `/chi-sono`, invito finale | `contenuti.fotoManuel` |
| 2–3 casi d'uso reali con numeri veri | `/casi-d-uso`, home | `contenuti.casiReali` |
| Screenshot di siti per clienti (con permesso) | `/siti-web` | `contenuti.screenshotClienti` |
| Testimonianze vere (con consenso): lo spazio resta nascosto finché la lista è vuota | Home, Casi d'uso, Siti web | `testimonianze` |
| Indirizzo da mostrare (o solo comune) | Footer, dati strutturati | `zona.indirizzo` |
| Mittente email del form (provvisorio fino al dominio) | Email automatiche | `contatti.emailMittenteForm` |
| Conferma fasce di prezzo | Prezzi, "Costruisci la tua automazione" | `prezzi` |
| Verifica costo risposte AI WhatsApp (0,0572 €) e voucher camerali 2026 | Prezzi, FAQ | `prezzi.costiRicorrenti` |
| Decisione sul riquadro "chiedi al sito" | Contatti | — |
| Periodo di conservazione delle richieste, servizi usati per n8n, email e calendario | `/privacy` | testo in `src/pages/privacy.astro` |
| Verifica dei casi d'uso d'esempio (problemi e stime realistici per i tuoi settori) | `/casi-d-uso` | testo in `src/pages/casi-d-uso.astro` |
| Foto reali e mappe d'archivio del territorio (domini delle collezioni aperte da autorizzare) | Chi sono, home | — |
| Profilo LinkedIn (facoltativo) | Footer | `contatti.linkedin` |
| PEC (facoltativa) | Footer | `datiLegali.pec` |
| Indirizzo `*.workers.dev` assegnato | README, test | `sito.urlProvvisorio` |
