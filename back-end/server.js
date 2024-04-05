// .\back-end\dependencies\node\npm start --prefix .\back-end

//BACK-END

const sqlite3 = require('sqlite3').verbose();
var isOn = false;
const databaseLocation = './data/test.db';

let mydb = new sqlite3.Database(databaseLocation,(err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Created database.');
  }
});
mydb.close();

let db = new sqlite3.Database(databaseLocation, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Connected to the database.');
    isOn = true;
  }
});

//test write

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Request (id INT UNIQUE, userId INT, hero INT, purchaseDate TEXT, state TEXT)`);

  const stmt = db.prepare(`INSERT OR IGNORE INTO Request VALUES (?, ?, ?, ?, ?)`);
  for (let i = 0; i < 6; i++) {
      const date = new Date().toISOString().split('T')[0];
      let userId = i < 3 ? 0 : 1;
      let state = i %3 == 0 ? "Pending" : i % 2 == 0 ? "Solved" : "Denied" ;
      stmt.run(i,userId,0,date,state);
  }
  stmt.finalize();
});

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

// close the database connection


//FRONT-END

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 2020;
var path = require('path');
const { stat } = require('fs');

app.get('/', (req, res) => { 
    res.sendFile(path.resolve('./../front-end/log_in.html')); 
});

app.use(express.static('./../front-end'));

//server console msg

let userSockets = {};
let isAlive = false;
io.on('connection', (socket) => {
  userSockets[socket.id] = socket;
  console.log('user connected');
  console.log('player count : '+ Object.keys(userSockets).length);
  io.emit('playerCount', Object.keys(userSockets).length);
  
  socket.on('pageLeave', () => {
    console.log('User left the page');
    isAlive = true;
  });

  socket.on('disconnect', () => {
    delete userSockets[socket.id];
    if(isAlive) {
      isAlive = false;
    } else {
      console.log('user disconnected');
      console.log('player count : ' + Object.keys(userSockets).length);
      io.emit('playerCount', Object.keys(userSockets).length);

      if (Object.keys(userSockets).length == 0) {
          db.close();
          console.log('Closing server...');
          server.close();
      }
    }
  });

  socket.on('requestReport', () => {
    db.all(`SELECT id, hero, state FROM Request WHERE userId = 0`, function(err, query) {  
      socket.emit('receiveReport', query);
    });
  })

  socket.on('deleteSolved', (userId) => {
    db.all(`DELETE FROM Request WHERE userId = ${userId} AND state = "Solved"`, function(err, query) {  
      socket.emit('deleteSolvedResponse');
    });
    
  })
});

server.listen(port, () => {
    console.log('Server Started.\nYou can now enter the site through http://localhost:'+port+'/report_center_see.html');
});
