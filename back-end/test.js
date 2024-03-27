// .\back-end\dependencies\node\npm start --prefix .\back-end

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 2020;
var path = require('path');

app.get('/', (req, res) => { 
    res.sendFile(path.resolve('./../front-end/log_in.html')); 
});

app.use(express.static('./../front-end'));

//server console msg

let playerCount = 0

io.on('connection', (socket) => {

    playerCount++;
    console.log('a user connected');
    console.log('player count : '+playerCount);
    
    socket.on('disconnect', () => {
        playerCount--;
        console.log('user disconnected');
        console.log('player count : '+playerCount);
    });
});

server.listen(port, () => {
    console.log('Server Started');
});
