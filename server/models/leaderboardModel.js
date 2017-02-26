var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var BoardSchema = new Schema({
  'playerName': String,
  'playerScore': Number
})

module.exports = mongoose.model('LeaderBoard', BoardSchema);
