const PersonModel = require('../model/person');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

module.exports = {

    create: function (req, res) {
        // Generate a new UUID.
        const carduuid = uuidv4();

        // Generrate PIN. Zahlen von 0 - 9999
        let zahl = 0;
        while (zahl < 1000) {
            zahl = Math.floor(Math.random() * 9999);
        }

        const hash = crypto.createHash('sha256');
        hash.update(zahl + '');

        const person = new PersonModel({
                title: req.body.title,
                name: req.body.name,
                vorname: req.body.vorname,
                strasse: req.body.strasse,
                hausnummer: req.body.hausnummer,
                stadt: req.body.stadt,
                postleitzahl: req.body.postleitzahl,
                email: req.body.email,
                authtries: 0,
                uuid: carduuid,
                card: {
                    pin: zahl,
                    pinSHA256: hash.digest('hex'),
                }
            })
        ;
        person.save(function (err, person) {
            if (err) {
                // HTTP Status Internal Server Error
                res.status(500).render('pages/abortion');
            } else {
                // HTTP Status OK
                res.status(200).render('pages/confirmation');
            }
        });
    },

    get: function (req, res) {
        const id = req.params.id;
        PersonModel.findOne({'_id': id}, function (err, person) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(person);
        });
    },

    index: function (req, res) {
        PersonModel.find({}, function (err, peoples) {
            if (err) {
                return res.status(500).send(null);
            }
            res.status(200).send(peoples);
        });
    },

    remove: function (req, res) {
        const id = req.params.id;
        PersonModel.remove({'_id': id}, function (err, person) {
            if (err) {
                return res.status(500).send(null);
            }
            res.status(200).send('Person entfernt!');
        })
    },

    updatePin: function (req, res) {
        const id = req.params.id;
        // Generrate PIN. Zahlen von 0 - 9999
        let zahl = 0;
        while (zahl < 1000) {
            zahl = Math.floor(Math.random() * 9999);
        }
        const pinzahl = zahl;

        const hash = crypto.createHash('sha256');
        hash.update(zahl + '');

        // PIN und SHA-256 Hash update durchführen
        PersonModel.findByIdAndUpdate(id, {
            $set: {card: {pin: pinzahl, pinSHA256: hash.digest('hex')}}
        }, {new: true}, function (err, person) {
            if (err) {
                return res.status(500).send(null);
            }
            res.status(200).send(person);
        });
    },

    releaseCard: function (req, res) {
        const id = req.params.id;
        // PIN und SHA-256 Hash update durchführen
        PersonModel.findByIdAndUpdate(id, {
            $set: {authtries: 0}
        }, {new: true}, function (err, person) {
            if (err) {
                return res.status(500).send(null);
            }
            res.status(200).send(person);
        });
    },

    removeAll: function (req, res) {
        PersonModel.remove({}, function (err) {
            if (err) {
                return res.status(500).send(null);
            }
            res.status(200).send('Alle Personen entfernt!');
        })
    },

    post: function (req, res) {
        const uuid = req.body.data.uuid;
        PersonModel.findOne({'uuid': uuid}, function (err, person) {
            if (err) {
                console.log("Person nicht gefunden! " + err);
                res.status(500).send(null);
            } else {
                res.status(200).send(person);
            }
        });
    },

    uuid: function (req, res) {
        const jsonUuid = req.body.data.uuid;

        PersonModel.findOne({'uuid': jsonUuid.uuid}, function (err, person) {
            if (err) {
                console.log("FEHLER: " + err);
                res.status(500).send(null);
            } else if (person != null) {
                console.log(person);
                res.status(200).send(person);
            } else {
                console.log("Person nicht gefunden! " + err);
                res.status(500).send(null);
            }
        });
    }
};
