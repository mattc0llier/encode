require('dotenv').config();
console.log('.env working?', process.env.DB_USERNAME);


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

// get all objectives
app.get('/api/objectives', function(req, res){
  // console.log('getting here');
  // .then(data => res.json({hello: 'world'))
  db.any('SELECT * FROM objectives')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get all organizations
app.get('/api/organizations', function(req, res){
  db.any('SELECT * FROM organizations')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get all courses
app.get('/api/courses', function(req, res){
  db.any('SELECT * FROM courses')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get all lessons
app.get('/api/lessons', function(req, res){
  db.any('SELECT * FROM lessons')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get all users
app.get('/api/users', function(req, res){
  db.any('SELECT * FROM users')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});
// retrieve User by id
app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  return db
    .one('SELECT id, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date FROM users WHERE username=$1', [username])
    .then(data => res.json(data))
    .catch(error => res.json({ error: error.message }));
});

// get all activities
app.get('/api/activities', function(req, res){
  db.any('SELECT * FROM activities')
  .then(data => res.json(data))
  .catch(error => res.json({ error: error.message }));
});

// get objectives and activity info for a given User Id
app.get('/api/users/:id/objectives', (req, res) => {
  const { id } = req.params;
  return db
    .any('SELECT objectives.id, objectives.number, objectives.objective, objectives.url, objectives.lesson_id, activities.complete, activities.completion_time FROM objectives, activities WHERE activities.objective_id = objectives.id AND activities.user_id=$1', [id])
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(error => res.json({ error: error.message }));
});

app.patch('/api/activity/:activityId', (req, res) => {
  const activityId = req.params.activityId
  const {complete, completion_time} = req.body

  db.none(`UPDATE activities SET complete = $1, completion_time = $2 WHERE id = $3`, [complete, completion_time, activityId])
  .then(() => {
    res.status(200).send({update: "success"});
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})

// get homepage
app.use('/', function(req, res){
  res.render('index');
});

app.listen(9090, function(){
  console.log('Listening on port 9090');
});
