const jwt = require('jsonwebtoken');
const PersonModel = require('../model/person');
const uuidv4 = require('uuid/v4');

module.exports = {
    auth: function (req, res) {
        // AUTHENTIFIZIERUNG
        // 1. Decode Entpacke den Inhalt der Karte.
        const jwtDecoded = jwt.decode(req.body.cardContent, {complete: true});
        const cardContent = jwt.decode(jwtDecoded.payload);

        // 2. schaue in der Datenbank nach der email
        PersonModel.findOne({'uuid': cardContent.uuid}, (err, person) => {
            if (err || person == null) {
                const sendObj = {
                    status: "404",
                    payload: 'Person nicht gefunden'
                };
                res.send(sendObj);

                // Prüfe ob nicht zu Oft Authentifizierungsversuche von der Selben Person kommen.
            } else {
                if (person.authtries < 3) {
                    // Übergebenen PIN Prüfen. Wenn Signatur verifizierbar => PIN ist richtig
                    jwt.verify(req.body.cardContent, person.card.pinSHA256, {algorithms: ['HS256']}, (err) => {
                        if (err) {
                            const sendObj = {
                                status: "606",
                                payload: 'PIN-Verifizierung Fehlgeschlagen!'
                            };
                            res.send(sendObj);

                            // FEHLEINGABE ZÄHLEN
                            let tries = person.authtries + 1;
                            person.update({authtries: tries}).exec();
                        } else {
                            // In der App wurde mit dem geteiltem PIN signiert
                            const tokenData = {
                                name: person.name,
                                vonrame: person.vorname,
                                email: person.email,
                                id: uuidv4()
                            };

                            // FEHLVERSUCHE ZURÜCKSETZEN
                            person.update({authtries: 0}).exec();

                            // 4. AUTHORISIERUNG Wenn alles gut Authorisierungstoken versenden ...
                            const authtoken = jwt.sign(tokenData, 'INTERN_AUTHORITY_PROVIDER_SECRET');

                            const sendObj = {
                                status: "200",
                                payload: authtoken
                            };
                            res.send(sendObj);
                        }
                    });
                } else {
                    // Zu oft Falsche PIN
                    const sendObj = {
                        status: "808",
                        payload: 'Ihre Karte ist GESPERRT! Wenden Sie sich an Systemadministrator.'
                    };
                    res.send(sendObj);
                }
            }
        });
    }
};