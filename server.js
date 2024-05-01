const express = require('express');
const app = express();

app.use(express.static('.'));

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Frontend server listening on port 3000');
});