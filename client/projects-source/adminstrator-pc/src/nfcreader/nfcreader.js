const sh = require('shelljs');
const jwt = require('jsonwebtoken');

module.exports = {

    read: () => {

        // Python Script mit Parameter aufrufen
        const command = 'python read.py';

        // Kommando ausführen
        const jwtToken = sh.exec(command, {silent: true});

        // Token zurückliefern
        return jwtToken;
    },

    write: (data, uuidSignKey) => {

        // Dem Python-Script wird die zu schreibende Information übergeben
        const dataToWrite = JSON.stringify(data);

        const jwtData = jwt.sign(dataToWrite, uuidSignKey);

        const command = 'python write.py ' + jwtData;

        // Rückgabe Paramter {stdout, stderr, code}
        return sh.exec(command, {silent: true});
    }
};
