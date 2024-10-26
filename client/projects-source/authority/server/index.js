const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const initDb = require('./initdb');
const personController = require('./controller/personcontroller');
const authController = require('./controller/authController'); // TODO: Existiert diese Route nicht?
const conf = require('./config');

// Datenbank initialisieren.
initDb.initdb();

// Erlaubt cross origin Zugriffe
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.resolve("./server/views"));

app.use("/images", express.static(path.resolve("./server/public/images")));
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({extended: false}));      // support encoded bodies

// Ausgeben aller Personen aus der Datenbank
app.get('/persons', personController.index);

// Ausgeben einer Person über die id aus der Datenbank
app.get('/persons/:id', personController.get);

// Entfernen einer Person über die id aus der Datenbank
app.get('/person/:id', personController.remove);

// Entfernen aller Personen aus der Datenbank
app.delete('/persons', personController.removeAll);

// Aktualisieren des Pins einer Person in der Datanbank
app.get('/person/pin/:id', personController.updatePin);

// Authentifizierungsanfrage vom Tablet verarbeiten
app.post('/auth', authController.auth);

// Rücksetzen der Sperrung der Karte einer Person
app.get('/person/authtries/:id', personController.releaseCard);

// PROVIDER: Eintragung der Personendaten in die Datenbank
app.post('/person', personController.create);

// Ausgeben der Person wem die Karte gehört
app.post('/personuuid', personController.uuid);

// Ausgeben der Daten zur Beschreibung der Karte
app.post('/persons/:id', personController.post);

// Provider Webseite: Wurzelroute # ok
app.get('/', function (req, res) {
    res.render('pages/index', {
        url: conf.HOST
    });
});

// Provider Webseite: alle anderen Routen # ok
app.get('*', function (req, res) {
    res.status(404).send('Die Seite wurde nicht gefunden');
});

// Serviceurl des Providers
app.listen(conf.PORT, function () {
    console.log('Provider URL: ' + conf.HOST);
});
