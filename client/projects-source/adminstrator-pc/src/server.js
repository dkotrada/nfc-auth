const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetcher = require('./fetcher/fetcher');
const nfcreader = require('./nfcreader/nfcreader');
const jwt = require('jsonwebtoken');
const conf = require('./config');

app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/views"));
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.get('/card', function (req, res) {
    res.render('pages/card/index', {
        person: null,
        message: 'Es wurde noch keine Karte eingelesen!',
        clazz: 'alert-info',
        alertshow: true
    });
});

// EXPRESS 4 http://expressjs.com/en/guide/routing.html
// HINZUFÜGEN EINER PERSON ZUR DATENBANK
app.route('/add')
    .get((req, res) => {
        res.render('pages/person/add', {alertshow: false});
    })
    .post((req, res) => {
        const person = req.body;
        const url = '/person';
        // Gebe die Form Data an den Provider weiter
        // Im response objekt zugriff auf
        // - response.data -> Inhalt z.B HTML
        // - response.status -> Status Code z.B 200
        // - response.headers -> z.B content-type:
        fetcher.postAddPerson(url, person)
            .then((response) => {
                if (response.status === 200) {
                    res.render('pages/person/add', {
                        message: '' + person.vorname + ' ' + person.name + ' wurde erfolgreich eingetragen!',
                        clazz: 'alert-success',
                        alertshow: true
                    });
                }
            })
            .catch((error) => {
                res.render('pages/person/add', {
                    message: 'FEHLER: ' + error,
                    clazz: 'alert-danger',
                    alertshow: true
                });
            });

    });

/* SCHREIBEN DER KARTE ROUTER 4.0*/
app.route('/persons/:id')
    .get((req, res) => {
        const url = '/persons/' + req.params.id;

        fetcher.get(url)
            .then((response) => {
                res.render('pages/person/index', {
                    person: response.data,
                    message: 'Bitte legen Sie vor Betätigen der Schaltfläche die zu beschreibende Karte auf das NFC-Schreibegerät! Beachten Sie auch, dass eine neue PIN generiert wird!',
                    clazz: 'alert-warning',
                    alertshow: true
                });
            })
            .catch((error) => {
                res.render('pages/person/index', {
                    message: 'FEHLER: ' + error,
                    clazz: 'alert-danger',
                    alertshow: true
                });
            })
    })
    .post((req, res) => {
        // Express parst Form POST Request zu Json Objekt
        const formdata = req.body;

        fetcher.post('/persons/' + formdata._id, {uuid: formdata.uuid})
            .then((response) => {
                if (response.status == 500) {
                    console.log("Fehler!");
                } else if (response.status == 200) {
                    const person = response.data;
                    // Nur nötige Informationen auf der Karte speichern
                    const toCard = {uuid: formdata.uuid};

                               // Schreiben auf die Karte mit card.uuid als Signatur
                    // Rückgabeparameter: {stdout, stderr, code}
                    const {stdout, stderr, code} = nfcreader.write(toCard, person.uuid);

                    // code 0 Schreiben war OK
                    if (code === 0) {
                        // Antwortseite Rendern
                        res.render('pages/person/index', {
                            message: 'Karte erfolgreich beschrieben!',
                            clazz: 'alert-success',
                            alertshow: true,
                            person: person
                        });
                    } else {
                        res.render('pages/person/index', {
                            message: 'Es ist ein Fehler aufgetreten!',
                            clazz: 'alert-danger',
                            alertshow: true
                        });
                    }
                }
            })
            .catch((error) => {
                res.render('pages/person/index', {
                    message: 'FEHLER: ' + error,
                    clazz: 'alert-danger',
                    alertshow: true
                });
            });


    });

// LESEN DER KARTE
app.get('/card/read', function (req, res) {

    const jwtToken = nfcreader.read();

    uuidStr = jwt.decode(jwtToken + "");

    const senddata = {uuid: uuidStr};

    fetcher.post('/personuuid', senddata)
        .then((response) => {
            // console.log("RESPONSE  ", response.data);
            if (response.status == 200) {
                res.render('pages/card/card', {
                    person: response.data,
                    message: 'Zuordnung der Karte zur Person erfolgreich gefunden.',
                    clazz: 'alert-success',
                    alertshow: true
                });
            } else {
                res.render('pages/card/card', {
                    person: null,
                    message: 'Person zur Karte nicht gefunden!',
                    clazz: 'alert-danger',
                    alertshow: true
                });
            }
        })
        .catch((error) => {
            res.render('pages/card/card', {
                person: null, message: 'Person zur Karte nicht gefunden! FEHLER: ' + error, clazz: 'alert-danger', alertshow: true
            });
        });
});


// Details der Person vom Server abfragen
app.get('/person/credentials/:id', function (req, res) {
    const url = '/persons/' + req.params.id;
    fetcher.get(url)
        .then((response) => {
            res.render('pages/person/credentials', {
                person: response.data,
                alertshow: false
            });
        })
        .catch((error) => {
            res.render('pages/person/credentials', {
                person: null,
                message: 'FEHER: ' + error,
                clazz: 'alert-danger',
                alertshow: true
            });
        })
});

// LÖSCHEN EINER PERSON AUS DER DATENBANK
app.get('/person/:id', function (req, res) {
    const url = '/person/' + req.params.id;
    fetcher.get(url)
        .then((response) => {
            res.render('pages/person/credentials', {
                person: null,
                message: 'Person erfolgreich aus Datenbank entfernt',
                clazz: 'alert-success',
                alertshow: true
            });
        })
        .catch((error) => {
            console.log(error);
            res.render('pages/person/credentials', {
                person: null,
                message: 'FEHLER: ' + error,
                clazz: 'alert-danger',
                alertshow: true
            });
        })
});

// PIN UPDATE IN DER DATENBANK
app.get('/person/pin/:id', function (req, res) {
    const url = '/person/pin/' + req.params.id;
    fetcher.get(url)
        .then((response) => {
            res.render('pages/person/credentials', {
                person: response.data,
                message: 'PIN erfolgreich aktualisiert: ' + response.data.card.pin,
                clazz: 'alert-success',
                alertshow: true
            });
        })
        .catch((error) => {
            console.log(error);
            res.render('pages/person/credentials', {
                person: null,
                message: 'FEHLER: ' + error,
                clazz: 'alert-danger',
                alertshow: true
            });
        })
});

// ANMELDEVERSUCHE ZURÜCKSETZEN Karte freischalten
app.get('/person/authtries/:id', function (req, res) {
    const url = '/person/authtries/' + req.params.id;
    fetcher.get(url)
        .then((response) => {
            res.render('pages/person/credentials', {
                person: response.data,
                message: 'Karte wurde erfolgreich freigeschaltet',
                clazz: 'alert-success',
                alertshow: true
            });
        })
        .catch((error) => {
            console.log(error);
            res.render('pages/person/credentials', {
                person: null,
                message: 'FEHLER: ' + error,
                clazz: 'alert-danger',
                alertshow: true
            });
        })
});

// AUFLISTEN DER PERSONEN
app.get('/persons', function (req, res) {
    const url = '/persons/';
    fetcher.get(url)
        .then((response) => {
            res.render('pages/persons/index', {
                persons: response.data
            });
        })
        .catch((err) => {
            res.render('pages/persons/index', {
                persons: null,
                message: 'FEHLER: ' + err,
                clazz: 'alert-danger',
                alertshow: true
            });
        })
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('*', function (req, res) {
    res.render('pages/errorpage');
});

app.listen(conf.PORT, function () {
    console.log('URL von AdminstratorUI: ' + conf.HOST);
});
