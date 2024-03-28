// .\back-end\dependencies\node\npm start --prefix .\back-end

//BACK-END

const sqlite3 = require('sqlite3').verbose();
var isOn = false;
const databaseLocation = './data/test.db';
/*
let db = new sqlite3.Database(databaseLocation,(err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Created database.');
  }
});
*/
let db = new sqlite3.Database(databaseLocation, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Connected to the database.');
    isOn = true;
  }
});

//test write
/*
db.serialize(() => {
  db.run("CREATE TABLE lorem (info TEXT)");

  const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
});
*/
//test read
/*
let sql = `SELECT * FROM lorem`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});
*/
// open the database

db.all("SELECT info FROM lorem", function(err, rows) {  
  rows.forEach(function (row) {  
      console.log(row);    
  })  
});

// close the database connection
db.close();

//FRONT-END

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
