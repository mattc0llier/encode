require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { summary } = require('date-streaks');
const format = require('pg-format');
const app = express();
const Pusher = require('pusher');

const pgp = require('pg-promise')();
const db = pgp({
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

//Pusher
const pusher = new Pusher({
  appId: '826493',
  key: 'afc88b08b01a286ce8f6',
  secret: process.env.PUSHER_SECRET,
  cluster: 'us3',
  encrypted: true
});

// passport
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
// const SlackStrategy = require('passport-slack').Strategy;

const connectEnsureLogin = require('connect-ensure-login');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

//managing session cookies
const cookieExpirationDate = new Date();
const cookieExpirationDays = 30;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
app.use(cookieParser());
app.use(require('express-session')({
  secret: process.env.EXPRESS_SESSION_STRING, // used to generate session ids
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(userId, done) {
  // db call to get user
  getUserByID(userId)
  .then(user => {
    done(null, user);
  })
});
//
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/auth/account', requireUser, (req, res) => {
  res.json({ user_id: req.user.id, username: req.user.username, email: req.user.email });
})

app.post('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.json('logged out'); //Inside a callback… bulletproof!
  });
});

function requireUser (req, res, next) {
  if (!req.user) {
    res.status(401).send('Not Authenticated')
  } else {
    next();
  }
};


// helper function for Passport but should i just be using app.get(/user/:id)
function getUserByUsername(username) {
  return db.one(
    'SELECT id, username, email, password FROM users WHERE username=$1', [username]
  )
  .catch((error)  => {
    console.log('failed to get user', error);
  });
}
// helper function for Passport but should i just be using app.get(/user/:id)
function getUserByID(id) {
  return db.one(
    'SELECT id, username, email, password FROM users WHERE id=$1', [id]
  )
  .catch((error) => {
    console.log('failed to get user', error);
  });
}

passport.use(new LocalStrategy(
  async (username, password, done) => {
    // get user.password with username in the db
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false);
    }
    // if passwords match make passwordMatches true else run await bcrypt compare
    function testPassword(test_password, db_password) {
      if (db_password == test_password) {
        // would this make passwordMatches truthy?
        return true;
      } else {
        return bcrypt.compare(test_password, db_password)
      }
    }
    const passwordMatches = await testPassword(password, user.password)

    if (passwordMatches) {
      done(null, user);
    } else {
      done(null, false);
    }
  }
));

// PASSPORT route to accept logins
app.post('/api/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.json({ user_id: req.user.id, username: req.user.username, email: req.user.email });
});


// changing state even when not successful - need to add a catch
// create new users
app.post('/api/users/create', function(req, res){
  const {first_name, last_name, username, email, password, type} = req.body
  bcrypt.genSalt(SALT_ROUNDS)
  .then( salt => {
    return bcrypt.hash(password, salt);
  })
  .then( hashedPassword => {
    db.one("INSERT INTO users (first_name, last_name, username, email, password, type, creation_date) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING id, first_name, last_name, username, email, password, type", [first_name, last_name, username, email, hashedPassword, type])
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

// get objectives for given course
app.get('/api/courses/:id/objectives', function(req, res){
  const { id } = req.params;
  db.any('SELECT objectives.id AS objective_id, objectives.number, objectives.objective, objectives.lesson_id, lessons.course_id FROM objectives, lessons WHERE objectives.lesson_id = lessons.id AND lessons.course_id=$1', [id])
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

// get objectives from activities for a given User Id
app.get('/api/users/:id/objectives', (req, res) => {
  const { id } = req.params;
  return db
    .any('SELECT objectives.id AS objective_id, objectives.number, objectives.objective, objectives.url, objectives.lesson_id, objectives.mastery_score, activities.id AS activity_id, activities.complete, activities.completion_time, activities.user_id, users.first_name, users.last_name, users.photo, users.username FROM objectives, activities, users WHERE activities.objective_id = objectives.id AND activities.user_id = users.id AND activities.user_id=$1', [id])
    .then(data => {
      res.json(data)
    })
    .catch(error => res.json({ error: error.message }));
});

// get all completed activties after a given time
app.get('/api/activties/since/:earliestCompletionTime', (req, res) => {
  const { earliestCompletionTime } = req.params;
  return db
    .any('SELECT activities.user_id, activities.id AS activity_id, activities.objective_id, activities.lesson_id, activities.course_id, activities.complete, activities.completion_time, users.username, users.photo, users.first_name, users.last_name, users.location, objectives.mastery_score FROM activities, users, objectives WHERE activities.complete = true AND activities.user_id = users.id AND objectives.id = activities.objective_id')
    .then(data => {
      const timeFilteredObjectives = data.filter(activity => {
        const objectiveTimes = Date.parse(new Date(activity.completion_time))
         if (objectiveTimes >= earliestCompletionTime) {
           return true
         } else {
           return false
         }
      })
      res.json(timeFilteredObjectives);
    })
    .catch(error => res.json({ error: error.message }));

})

// get course from activities info for a given User Id
app.get('/api/users/:id/courses', (req, res) => {
  const { id } = req.params;
  return db
    .any('SELECT courses.id AS course_id, courses.name, courses.url, courses.badge, activities.id AS activity_id, activities.complete, activities.completion_time, activities.user_id, activities.created_at, users.username FROM courses, activities, users WHERE activities.course_id = courses.id AND activities.user_id = users.id AND activities.user_id=$1', [id])
    .then(data => {
      res.json(data)
    })
    .catch(error => res.json({ error: error.message }));
});
// get all previous objectives and activity info for a given User Id and last objective time
app.get('/api/users/:id/objectives/complete/:lastestStatusTime', (req, res) => {
  const { id, lastestStatusTime } = req.params;
  return db
    .any('SELECT objectives.id AS objective_id, objectives.number, objectives.objective, objectives.url, objectives.lesson_id, objectives.mastery_score, activities.id AS activity_id, activities.complete, activities.completion_time, activities.user_id, users.first_name, users.last_name, users.photo, users.username FROM objectives, activities, users WHERE activities.objective_id = objectives.id AND activities.user_id = users.id AND activities.user_id=$1 AND activities.complete = true ORDER BY activities.completion_time ASC', [id])
    .then(data => {
    // 1. take the status user id and pull out all their completed objectives
    // 2. filter those objectives for anything before the last status completed timeout
    // 3. Once you have this array, find the objective score by finding the length of the array
    // 4. find the mastery score for that user at that point in time by reducing over the objectives.mastery_score

      const previousCompletedObjectives = data.filter(status => {
        const previousObjectiveTimes = new Date(status.completion_time)
         if (Date.parse(previousObjectiveTimes) <= lastestStatusTime) {
           return true
         } else {
           return false
         }
      })

      const dates = previousCompletedObjectives.map(objective => (
        objective.completion_time
      ))
      const statusStreakSummary = summary({ dates });


      const statusObjectivesScore = previousCompletedObjectives.length
      const statusMasteryScore = previousCompletedObjectives.reduce(function(acc, cur) {
        return acc + cur.mastery_score
      }, 0);

      res.json({ mastery: statusMasteryScore, streak: statusStreakSummary.currentStreak,  objectives: statusObjectivesScore });
    })
    .catch(error => res.json({ error: error.message }));
});

// update completed activities
app.patch('/api/activities/:activityId', (req, res) => {
  const activityId = req.params.activityId
  const {complete} = req.body

  db.one(`UPDATE activities SET complete = $1, completion_time = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id AS activity_id, complete, completion_time`, [complete, activityId])
  .then((data) => {
    pusher.trigger('activityUpdate', 'activityComplete', {
      "message": data
    });
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})

app.get('/api/users/:id/scores', (req, res) => {
  const { id } = req.params;
  db.one('SELECT scores.id AS score_id, scores.user_id, scores.mastery, scores.streak, scores.objective_count FROM scores WHERE user_id=$1', [id])
  .then(data => {
    res.json(data)
  })
  .catch(error => res.json({ error: error.message }));
})

// if change to desc then need to update status lastest objective completion_time
app.get('/api/activities/objectives/complete', (req, res) => {
  db.any('SELECT objectives.id AS objective_id, objectives.number, objectives.objective, objectives.url, objectives.lesson_id, objectives.mastery_score, activities.id AS activity_id, activities.complete, activities.completion_time, activities.user_id, users.first_name, users.last_name, users.photo, users.username FROM objectives, activities, users WHERE activities.objective_id = objectives.id AND activities.user_id = users.id AND activities.complete = true ORDER BY activities.completion_time ASC')
  .then(data => {
    res.json(data)
  })
  .catch(error => res.json({ error: error.message }));
})

//get all objectives for a course helper method
function getObjectivesByCourseId(id) {
  return db.any(
    'SELECT objectives.id AS objective_id, objectives.number AS objective_number, objectives.lesson_id, lessons.id AS lesson_id, lessons.course_id FROM objectives, lessons, courses WHERE objectives.lesson_id = lessons.id AND lessons.course_id = courses.id AND courses.id = $1', [id]
  )
  .catch((error) => {
    console.log('failed to get user', error);
  });
}

const newActivities = async (userId, courseId, selectiveObjectiveNumber) => {
  const allCourseObjectives = await getObjectivesByCourseId(courseId)


  //for any objective where objective.number < slectedobjective.number then
  // completed is true and completed time is now
  const isoDateNow = new Date().toISOString()

  const objectiveActivities = allCourseObjectives.map(function(objective) {

    if(objective.objective_number < selectiveObjectiveNumber){
      return ['objective', objective.objective_id, null, null, userId, true, isoDateNow, isoDateNow]
    } else {
      return ['objective', objective.objective_id, null, null, userId, false, null, isoDateNow]
    }
  })
  const courseActivity = [['course', null, null, Number(courseId), userId, false, null, isoDateNow]]
  console.log('courseActivity', courseActivity);
   const combinedActivites = objectiveActivities.concat(courseActivity)
   console.log('combinedActivites', combinedActivites);

  return  combinedActivites
}

const insertActivities = async (activities) => {
  const query1 = format("INSERT INTO activities (type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at) VALUES %L RETURNING id, type, objective_id, lesson_id, course_id, user_id, complete, completion_time, created_at", activities)

    const  {rows} = await db.query(query1);
    return rows
}

// create user activities when they enroll in a course
app.post('/api/users/activities/create', async (req, res) => {
  // theses aren't match proparly yet
  const { currentUser, course, objective } = req.body;
  try {
    const formattedActivitiesToInsert = await newActivities(currentUser.user_id, course.id, objective.number)
    const rows = await insertActivities(formattedActivitiesToInsert)
    res.status(200).send({update: "success"});
    res.end()
  } catch (error) {
    res.status(500).send({update: "Activities not created"});
  }

})

app.patch('/api/users/:id/update', (req, res) => {
  const userId = req.params.id
  const {updatedInfo} = req.body


  db.one(`UPDATE users SET bio = $2, location = $3, photo = $4 WHERE id = $1 RETURNING *`, [userId, updatedInfo.bio, updatedInfo.location, updatedInfo.profilePicture])
  .then((data) => {
    res.json(data)
  })
  .catch(error => {
    res.json({
      error: error.message
    });
  });
})

app.get('/api/users/:id/settings', (req, res) => {
  const { id } = req.params;
  db.one('SELECT users.id AS user_id, users.photo, users.bio, users.location FROM users WHERE id=$1', [id])
  .then(data => {
    res.json(data)
  })
  .catch(error => res.json({ error: error.message }));
})

//BROWSER extension

//get all activity data from browser url
function getActivitiesByUrlAndUserId(tabUrl) {
  console.log('getActivitiesByUrlAndUserId tabUrl', tabUrl);
  return db.one('SELECT * FROM objectives WHERE url=$1', [tabUrl])
  .catch((error) => {
    console.log('failed to get user', error);
  });
}

//receive current context tab activities
// app.get('/api/tabContext', async (req, res)  => {
//
//   console.log('ext receive', req.params);
//   console.log('req.query.url', req.query.url);
//   const tabUrl = req.query.url
//   const user_id = 13
//
//   const tabObjective = await getActivitiesByUrlAndUserId(tabUrl)
//   console.log('confirmedObjective tabObjective', tabObjective);
//
//   db.any('SELECT activities.id AS activity_id, activities.objective_id, objectives.number, objectives.objective, objectives.url, objectives.mastery_score, objectives.lesson_id, activities.complete, activities.completion_time, activities.user_id FROM activities, objectives  WHERE objectives.url=$1 AND activities.user_id=$2 AND activities.objective_id=$3', [tabUrl, user_id, tabObjective.id])
//   .then(data => {
//     console.log('data', data);
//     res.json(data)
//   })
//   .catch(error => res.json({ error: error.message }));
//   // pusher.trigger('globalContext', 'update-context', {
//   //   "message": req.body
//   // });
// })

// index route
app.get('/', function(req, res) {
  res.render('index');
});

app.get('*', function(req, res) {
  res.render('index');
});


const port = process.env.PORT || 9090;
app.listen( port, function(){
  console.log(`Listening on port number ${port}`);
});
