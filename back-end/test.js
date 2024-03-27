var msg = "Death";
console.log(msg);

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '',
    database: 'testdata.ddl'
})