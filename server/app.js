const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const hash = require('password-hash')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/UsersModel.js');
require('dotenv').config()

var users = require('./routes/UsersRoutes');

var app = express()

//Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log(`connected to Port ${process.env.PORT} At ${process.env.MONGODB_URI}`);
});

passport.use('login', new LocalStrategy({
  session: false
},
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user) {
      if (hash.verify(password, user.password)){
          done(null, user)
        } else {
          done(null, false)
        }
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(passport.initialize());


app.use('/api/users', users);

app.listen(process.env.PORT)
