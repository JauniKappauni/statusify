const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ping = require('ping');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.set('view engine', 'ejs');

const services = [
    { name: "pve-01 IPv4", host: "1.1.1.1"},
    { name: "pve-01 IPv6", host: "2606:4700:4700::1111"},
    { name: "pve-02 IPv6", host: "2606:4700:4700::1001"}
];

function checkStatus() {
    services.forEach((service) => {
        ping.sys.probe(service.host, (isOnline) => {
            service.status = isOnline ? "Online ✅" : "Offline ❌"
            io.emit('statusupdate', services)
        })
    })
}

setInterval(checkStatus, 1000);

app.get('/', (req, res) => {
    res.render('index', { services });
});

server.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
