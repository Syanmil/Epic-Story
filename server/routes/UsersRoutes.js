var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController.js');
var passport = require('passport')

router.get('/', UsersController.list);
router.get('/:id', UsersController.show);
router.post('/register', UsersController.create);
router.post('/login', passport.authenticate('login'), UsersController.login);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);

module.exports = router;
