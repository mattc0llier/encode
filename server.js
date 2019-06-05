require('dotenv').config();
console.log('.env working?', process.env.TESTING);


const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

// get homepage
app.use('/', function(req, res){
  res.render('index');
});

// get all objectives
app.get('/api/objectives', function(req, res){
  db.any('SELECT * FROM objectives')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get all objectives
app.get('/api/objectives', function(req, res){
  db.any('SELECT * FROM objectives')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

app.listen(9090, function(){
  console.log('Listening on port 9090');
});
