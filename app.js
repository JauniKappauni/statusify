const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const services = [
    { name: "pve-01 IPv4", status: "Online ✅" },
    { name: "pve-01 IPv6", status: "Online ✅" },
    { name: "pve-02 IPv6", status: "Offline ❌" }
];

app.get('/', (req, res) => {
    res.render('index', { services });
});

app.listen(port, () => console.log(`Server läuft auf http://localhost:${port}`));
