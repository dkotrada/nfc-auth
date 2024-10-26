// Client Konfiguration Administrator Dashboard
const port = 3003;
const host = 'localhost';
const protocol = 'http';

// Server Konfiguration Provider
const server_port = 3000;
const server_host = 'localhost';
const server_protocol = 'http';


module.exports = {
    PORT: port,
    HOST: protocol + '://' + host + ':' + port,
    SERVER_HOST: server_protocol + '://' + server_host + ':' + server_port
};