# scioperi-trasporti (ITA)
API REST, sito web e interfaccia a linea di comando per rimanere aggiornati sugli scioperi dei trasposti in Italia.

L'applicazioen si basa su dati forniti dal feed RSS del Ministero delle infrastrutture e della mobilità sostenibili (MIT).

# Perché?
Attraverso il portale del Ministero è possibile accedere ai dati attraverso un feed RSS o un sito web. Quello che tuttavia manca è un modo semplice per includere tali dati in applicazioni di terze parti, magari applicando eventuali filtri. Quest'app ha l'obiettivo di facilitare l'accesso ai dati del Ministero fornendoli agli utenti in maniera strutturata e facilmente filtrabile.

# Funzionalità
L'app si compone di:
* Script per CLI (requisiti: node.js, npm, moduli aggiuntivi)
* API REST per implementazioni di terze parti
* Interfaccia web minimale (TODO)

# Interfaccia a linea di comando (CLI)
L'interfaccia CLI (linea di comando) offre due funzionalità:
* Visualizzare tutti gli scioperi programmati a livello nazionale (inclusi quelli limitati a livello regionale o provinciale)
* Visualizzare gli scioperi programmati per una singola regione (inclusi quelli nazionali ma esclusi quelli limitati ad altre regioni o province non appartenenti alla regione).
## Requisiti
* Node.js
* npm 

attraverso npm con il comando `npm install` sarà possibile installare il modulo "rss-parser", necessario per l'esecuzione dell'applicazione.
## Comandi
* `node main` visualizza tutti gli scioperi presenti nel feed del Ministero: nazionali, regionali, provinciali.
* `node main REGIONE` con REGIONE sostituito dal nome di una regione. Visualizza gli scioperi programmati per tale regione, inclusi quelli nazionali. Il parametro regione NON è CaSe SeNsItIvE, lo script non fa distinzioni tra lettere maiuscole e minuscole.

_Esempio: `node main Piemonte` stamperà tutti gli scioperi nazionali e quelli regionali limitati al Piemonte ma NON quelli limitati ad altre regioni._

# API
L'API offre tre funzionalità:
* Visualizzare tutti gli scioperi programmati a livello nazionale (inclusi quelli limitati a livello regionale o provinciale, per tutte le regioni o province)
* Visualizzare gli scioperi programmati per una singola regione (inclusi quelli nazionali ma esclusi quelli limitati ad altre regioni o province non appartenenti alla regione).
* Visualizzare esclusivamente gli scioperi programmati per una singola regione (esclusi quelli nazionali).
## Documentazione
L'entry point dell'API è [scioperi-trasporti.herokuapp.com](https://scioperi-trasporti.herokuapp.com/). La documentazione dell'API è disponibile nella [guida](https://github.com/ornato-t/scioperi-trasporti/wiki/Documentazione-API) della repository.

# scioperi-trasporti (ENG)
An unofficial REST API, website and CLI script to stay up to date with transportation strikes in Italy.

This app is based on data provided by the official RSS feed of the Ministero delle infrastrutture e della mobilità sostenibili (MIT).

# Why?
The Ministry allows access to the data via a RSS feed or a website. What's missing is a clean way to extract said data and employ it in 3rd party applications. This app aims to ease the access to the Ministry's data, providing a clear, structured collection to the user.

# Feautres
The app comprises:
* CLI script (requirements: node.js, npm, additional modules)
* REST API for 3rd party applications
* Minimal web interface (TODO)

# Command line interface (CLI)
The command line interface provides two functionalities:
* Show any planned strikes on national level (including region specific or province specific ones)
* Show planned strikes for a single region (including nation wide ones but excluding those limited to other regions or provinces not included in said region)

## Requirements
* Node.js
* npm

The command `npm install` will install the required "rss-parser" module.

## Commands
* `node main` shows any planned strike included in the dataset provided by the Ministry
* `node main REGION` where REGION is the name of a region. Shows any planned strike for that region, including nation wide ones. The REGION parameter is NOT CaSe SeNsItIvE, the script does not accepts both uppercase and lowercase inputs.

_Note: the REGION parameter is to be provided in Italian. Use the Italian name of the region, not the English one_  
_Example: `node main Piemonte` will show any planned nation wide strike, strikes planned for the Piedmont region but NOT those planned for other regions._ù

# API
The API offers three functionalities:
* Show any planned strikes on national level (including region specific or province specific ones)
* Show planned strikes for a single region (including nation wide ones but excluding those limited to other regions or provinces not included in said region)
* Show exclusively planned strikes for a single region (does not include nation wide ones, only region specific ones for the provided region)

## Documentation
The API entry point is [scioperi-trasporti.herokuapp.com](https://scioperi-trasporti.herokuapp.com/). The API documentation is available on the repository [wiki](https://github.com/ornato-t/scioperi-trasporti/wiki/Documentazione-API).