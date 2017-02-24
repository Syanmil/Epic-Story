var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UsersSchema = new Schema({	'username' : {		type: String,		required: [true, 'Username Required']	},	'password' : {		type: String,		required: [true, 'Password Required']	},	'email' : {		type: String,		required: [true, 'Email Required'],		unique: [true, 'Email Already Registered']	}});

module.exports = mongoose.model('Users', UsersSchema);
