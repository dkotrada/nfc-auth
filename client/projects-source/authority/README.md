#  Für windows

- in einer Konsole folgendes starten: mongod
- in der anderen folgendes starten: mongo 

- node 6 mit nvm installiert
- webpack?
# NodeJS Application mit Express, Bootstrap, MongoDB und Mongoose

## Anlegen von Gitignore Datei

Beim Arbeiten mit dem Git Versionsverwaltungssystem ist es empfehlenswert nicht alle Dateien von dem Projekt mit dem Git zu versionieren. Daher legen wir die `.gitignore` Datei in unserem Projektordner an.
~~~
~~~


## Node.js
Node.js ist ein in C++ geschriebene Laufzeitumgebung für Chrome V8 JavaScript Maschine. Es erlaubt den JavaScript Programmierern serverseitige Programme zu schreiben. Durch ereignisgesteuertes nicht blockierendes Eingabe/Ausgabe Model ist Node.js effizient und ressourcenschonend. Das npm Ökosystem von Node.js ist das größte Ökosystem von Open Source Bibliotheken in der Welt.

https://nodejs.org/de/

## Express.js
Express ist ein schnelles, offenes, unkompliziertes Web-Framework für Node.js.
http://expressjs.com/de/

### Erstellung einer Express Application

Vorausgesetzt Node.js ist schon installiert. Im Projektordner folgende Kommandos ausführen:
- `touch kundenkarte.js` eine JavaScript Datei anlegen. Fungiert als Einstiegspunkt der Anwendung.
- `$ npm init` und die Fragen beantworten.
- `$ npm install express --save`
- Die Datei `kundenkarte.js` mit dem Inhalt befüllen. http://expressjs.com/de/starter/hello-world.html
- Express-App starten: `$ node kundenkarte.js`
- Express-App ansezen: Im Browser `localhost:3000` laden.


## MongoDB
Eine der Führenden NoSQL Datenbanken. Ist eine Allzweckdatenbank mit offenem Quellcode. Sie hat u.a. folgende Merkmale:
- Dokumentdatenmodell mit dynamischen Schemata
- Umfassende, flexible Indexunterstützung und mächtige Abfragen
- Aggregation-Framework und MapReduce
- Auto-Sharding für horizontale Skalierbarkeit
- Eingebaute Replikation für Hochverfügbarkeit
- Textsuche
- Erweiterte Sicherheit (z.B. Kerberos Unterstützung)
- Speicherung großer Dateien mit GridFS

https://www.mongodb.com/de

### MongoDB Installation
Um MongoDB zu installieren einfach den Anleitungen auf den folgenden Webseiten folgen:
- https://docs.mongodb.com/manual/administration/install-community/
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
#### Starten vom Server
- sudo service mongod start
- mongo --shell


## Mongoose
Mongoose ist ein ODM Objekt-Datenbank-Management-System für Node.js

http://mongoosejs.com/

### Mongoose Installation und Benutzung

- Im Projektordner das Kommando `$ npm install mongoose --save` ausführen.
- Danach ist das Modul in der `package.json` Datei eingetragen. Z.B. `"mongoose": "^4.12.4"`
- Die Datei `kundenkarte.js` mit folgendem Inhalt erweitern:

~~~js
// Einbinden des Moduls
var mongoose = require('mongoose');
// Verbindung zur Datenbank aufbauen
mongoose.connect('mongodb://de-kundenkarte-user:<PASSWORD>@ds125365.mlab.com:25365/de-kundenkarte-db', { useMongoClient: true });
// Anstatt von Callbacks die asynchronen Operationen mit Promise benutzen
mongoose.Promise = global.Promise;

// Mongoose Model definieren: Cat Objekt mit dem Attribut Name
var Person = mongoose.model('Person', { name: String });

// Objekte aus dem Datenbank auflisten
Person.find(function(err, cats) {
  if (err) return console.error(err);
  console.log(cats);
})
~~~

## Ausliefern einer statischen HTML Webseite

Der Pfad, den Sie für die Funktion express.static angeben, ist jedoch relativ zum Verzeichnis, aus dem Sie Ihren Prozess node starten. Wenn Sie die Express-Anwendung aus einem anderen Verzeichnis ausführen, ist es sicherer, den absoluten Pfad des Verzeichnisses zu verwenden, das Sie bereitstellen wollen:


~~~js
app.use('/static', express.static(__dirname + '/public'));
~~~

### Aufbau der statischen index.html Seite

#### Design mit Bootstrap Framework
Build responsive, mobile-first projects on the web with the world's most popular front-end component library.

Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.

http://getbootstrap.com/


## Übername der Daten von der Webseite

### POST Daten auslesen

- `npm install body-parser --save`


## Mongo Server Starten Stoppen

`sudo service mongod start`

`sudo service mongod stop`
~~~package.json
    "prestart": "sudo service mongod start",
    "start": "node ./fuse.js",
    "poststop": "sudo service mongod stop"
~~~

### Mongo Consolen Bedienung
- https://docs.mongodb.com/manual/reference/mongo-shell/
- Starte shell `mongo --shell`
- Zeige Datenbanken `show dbs`
- Auswählen des Datenbankes `use databasename`
- Kollectionen anzeigen `show collections` oder `show tables`
- Inhalt aller Daten in der Kollektion anzeigen `db.collectioname.find()`
- Gesamten Inhalt aus der Kollektion entfernen `db.collectionname.remove({})` https://docs.mongodb.com/getting-started/shell/remove/

## MongoDB befüllen des Datenbanks mit Beispieldaten
- in dem Datenbank `kundenkarte_db`
- collection `people`
- https://docs.mongodb.com/getting-started/shell/import-data/
- `mongoimport --db kundenkarte_db --collection people --drop --file DATABASE_SEED.json --jsonArray`

## Bei Neustart von Computer soll mongod Service gestartet werden
`sudo service mongod start` oder stop

## Obiges Kommando funktioniert nach dem Update nicht mehr

- Neues commando vor dem Start der Authority `mongod --dbpath ~/dev/mongodb/` im extra terminal

## Ab jetzt 24. Dez. 17 wird yarn benutzt.
www.yarnpkg.com