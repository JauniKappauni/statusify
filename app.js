const express = require('express');
const ping = require('ping');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const services = [
    { name: "pve-01 IPv4", host: "1.1.1.1"},
    { name: "pve-01 IPv6", host: "2606:4700:4700::1111"},
    { name: "pve-02 IPv6", host: "2606:4700:4700::1001"}
];

function checkStatus() {
    services.forEach((services) => {
        ping.sys.probe(services.host, (isOnline) => {
            services.status = isOnline ? "Online ✅" : "Offline ❌"
        })
    })
}

setInterval(checkStatus, 1000);

app.get('/', (req, res) => {
    res.render('index', { services });
});

app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
