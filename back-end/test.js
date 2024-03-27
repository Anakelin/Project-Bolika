// .\dependencies\node-v20.11.1-win-x64\npm init
// .\\dependencies\\node-v20.11.1-win-x64\\node back-end/test.js
var msg = "Death";
console.log(msg);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../front-end/sign_in.html');
});

app.use(express.static('public'));