var leaderboardModel = require('../models/leaderboardModel.js');

module.exports = {
  list: function(req, res){
    leaderboardModel.find()
    .sort({ playerScore: -1})
    .exec(function (err, board) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Boards.',
          error: err
        });
      }
      return res.json(board);
    });
  },
  create: function(req, res){
    console.log(req.body.playerName);
    var Boards = new leaderboardModel({
			playerName : req.body.playerName,
			playerScore : req.body.playerScore
      });
    Boards.save(function (err, Boards) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Boards',
          error: err
        });
      }
      return res.status(201).json(Boards);
    });
  }
}
