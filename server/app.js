const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const hash = require('password-hash')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var users = require('./routes/usersRoutes');

var app = express()

//Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log(`connected to Port ${process.env.PORT} At ${process.env.MONGODB_URI}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/users', users);

app.listen(process.env.PORT)
