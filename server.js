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

// passport
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
// const SlackStrategy = require('passport-slack').Strategy;

// const connectEnsureLogin = require('connect-ensure-login');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

//managing session cookies
const cookieExpirationDate = new Date();
const cookieExpirationDays = 20;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'some random text #^*%!!', // used to generate session ids
  resave: false,
  saveUninitialized: false
}));

// passport slack Strategy
// passport.use(new SlackStrategy({
//     clientID: process.env.SLACK_CLIENT_ID,
//     clientSecret: process.env.SLACK_CLIENT_SECRET,
//     skipUserProfile: false, // default
//     scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
//   }, (accessToken, refreshToken, profile, done) => {
//     // optionally persist profile data
//     console.log('SlackStrategy is this being hit', accessToken);
//     console.log('SlackStrategy is this being hit', refreshToken);
//     console.log('profile', profile);
//     console.log('profile.id', profile.id);
//     console.log('profile.team', profile.team.id);
//     console.log('profile.displayName', profile.displayName);
//
//     // this needs to be an update
//     db.one(
//           "INSERT INTO users (slack_user_id, slack_team_id, slack_display_name, first_name, last_name, photo, username, email, password, tel, bio, location, creation_date) VALUES ($1, $2, $3, 'temporary', 'temporary', 'temporary', 'temporary', 'temporary', 'temporary', 'temporary', 'temporary', 'temporary', CURRENT_TIMESTAMP) RETURNING id, slack_user_id, slack_team_id, slack_display_name", [profile.id, profile.team.id, profile.displayName]
//         )
//     .then((response) => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.log({
//         error: error.message
//       });
//     });
//
//     done(null, profile);
//   }
// ));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser');
  done(null, obj);
});
//
app.use(passport.initialize());
app.use(passport.session());

// on clicking "logoff" the cookie is cleared
// app.get('/logoff',
//   function(req, res) {
//     res.clearCookie('slack-passport-example');
//     res.redirect('/');
//   }
// );

// app.get('/auth/slack', passport.authenticate('slack'));
//
// app.get('/auth/slack/callback',
// passport.authenticate('slack',
//   { successRedirect: '/feed', failureRedirect: '/' }
// ));

// on successful auth, a cookie is set before redirecting
// // to the success view
// app.get('/setcookie', requireUser,
//   function(req, res) {
//     res.cookie('slack-passport-example', new Date());
//     console.log('setcookie');
//     res.redirect('/success');
//   }
// );
//
// // if cookie exists, success. otherwise, user is redirected to index
// app.get('/success', requireLogin,
//   function(req, res) {
//     if(req.cookies['slack-passport-example']) {
//       console.log('cookie success');
//       res.redirect('/feed');
//     } else {
//       console.log('cookie fail');
//       res.redirect('/');
//     }
//   }
// );
//
// function requireLogin (req, res, next) {
//   if (!req.cookies['slack-passport-example']) {
//     res.redirect('/');
//   } else {
//     console.log('hit requireLogin')
//     next();
//   }
// };
//
// function requireUser (req, res, next) {
//   if (!req.user) {
//     res.redirect('/');
//   } else {
//     console.log('hit requireUser')
//     next();
//   }
// };

// helper function for Passport but should i just be using app.get(/user/:id)
function getUserByUsername(username) {
  console.log('username', username);
  return db.one(
    'SELECT id, username, email, password FROM users WHERE username=$1', [username]
  )
  .catch((error) => {
    console.log('failed to get user', error);
  });
}

passport.use(new LocalStrategy(
  async (username, password, done) => {
    // get user.password with username in the db
    const user = await getUserByUsername(username);
    console.log('user', user);
    console.log('user.password', user.password);
    console.log('auth password', password);

    if (!user) {
      return done(null, false);
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (passwordMatches) {
      console.log(user)
      done(null, user);
    } else {
      done(null, false);
    }
  }
));

// User login page
app.get('/login', function(req, res){
  res.render('login', {})
})

// PASSPORT route to accept logins
app.post('/api/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.json(req.body);
});


// changing state even when not successful - need to add a catch
// create new users
app.post('/api/users/create', function(req, res){
  console.log(req.body);
  const {username, email, password} = req.body
  bcrypt.genSalt(SALT_ROUNDS)
  .then( salt => {
    return bcrypt.hash(password, salt);
  })
  .then( hashedPassword => {
    db.one("INSERT INTO users (username, email, password, creation_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id, username, email", [username, email, hashedPassword])
    .then((data) => {
      res.json(data)
      res.status(200).send({update: "success"});
    })
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})

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
    .any('SELECT objectives.id AS objective_id, objectives.number, objectives.objective, objectives.url, objectives.lesson_id, activities.id AS activity_id, activities.complete, activities.completion_time FROM objectives, activities WHERE activities.objective_id = objectives.id AND activities.user_id=$1', [id])
    .then(data => {
      res.json(data)
    })
    .catch(error => res.json({ error: error.message }));
});

app.patch('/api/activities/:activityId', (req, res) => {
  const activityId = req.params.activityId
  const {complete} = req.body

  db.one(`UPDATE activities SET complete = $1, completion_time = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id AS activity_id, complete, completion_time`, [complete, activityId])
  .then((data) => {
    res.json(data)
    res.status(200).send({update: "success"});
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})

// index route
// I don't know how to pass this client id into my front end code
app.get('/', function(req, res) {
  res.render('index', {client_id: process.env.SLACK_CLIENT_ID});
});

app.listen(9090, function(){
  console.log('Listening on port 9090');
});
