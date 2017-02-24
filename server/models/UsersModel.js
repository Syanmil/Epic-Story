var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UsersSchema = new Schema({	'username' : String,	'password' : String,	'email' : String});

module.exports = mongoose.model('Users', UsersSchema);
