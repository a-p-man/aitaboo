const express = require('express');
const app = express();
const port = 3001;  // Use a different port than your backend

app.use(express.static('.'));  // Serve static files from 'frontend' directory

app.listen(port, () => {
    console.log(`Frontend is being served at http://localhost:${port}`);
});