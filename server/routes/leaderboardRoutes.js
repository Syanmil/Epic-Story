var express = require('express');
var router = express.Router();
var leaderboardController = require('../controllers/leaderboardController.js');

router.post('/', leaderboardController.create)
router.get('/', leaderboardController.list)

module.exports = router;
