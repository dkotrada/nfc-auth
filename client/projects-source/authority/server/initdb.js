const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1/kundenkarte_db';
const sh = require('shelljs')

module.exports = {
    initdb: function (req, res) {
        mongoose.connect(url, {useMongoClient: true});

        const connection = mongoose.connection;

        connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

    },
    populationcheck: function (req, res) {
        // Connect using MongoClient
        MongoClient.connect(url, function (err, db) {
            // Use the admin database for the operation
            const adminDb = db.admin();

            db.listCollections({name: "people"}).toArray(function (err, items) {
                // console.log(items[0].name);
                if (items[0].name == 'people') {
                    // Alles Ok Collection ist da
                } else {
                    // Populate database
                    const command = 'mongoimport --db kundenkarte_db --collection people --drop --file DATABASE_SEED.json --jsonArray';
                    sh.exec(command, {silent: true});
                }

            });
            db.close();
        });
    }
}