const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema Definition http://mongoosejs.com/docs/validation.html
const personSchema = new Schema({
    title: String,
    name: {type: String, required: true},
    vorname: {type: String, required: true},
    strasse: String,
    hausnummer: Number,
    stadt: String,
    postleitzahl: Number,
    email: {type: String, required: true},
    authtries: 0,
    uuid: {type: String, requrired: true},
    card:
        {
            pin: {type: Number},
            pinSHA256: {type: String, required: true}
        }
});

module.exports = mongoose.model('Person', personSchema);
