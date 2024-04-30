const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('.'));

const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');

const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);

httpsServer.listen(3001, () => {
    console.log('Frontend HTTPS server running on https://localhost:3001');
});