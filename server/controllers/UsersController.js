var UsersModel = require('../models/UsersModel.js');
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
    login: function(req, res){
        let username = req.body.username
        let password = req.body.password
        UsersModel.findOne({username: username}, function(err, user){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Incorrect username or password'
                });
            }
            if (user) {
                if (hash.verify(password, user.password)){
                    let token = jwt.sign({username: user.username}, process.env.SECRETJWT)
                    res.json({
                        token: token,
                        username: username
                    })
                } else {
                    return res.status(404).json({
                        message: 'Incorrect username or password'
                    });
                }
            }
        })
    },
    list: function (req, res) {
        UsersModel.find(function (err, Userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }
            return res.json(Userss);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }
            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }
            return res.json(Users);
        });
    },
    create: function (req, res) {
      var Users = new UsersModel({			username : req.body.username,			password : hash.generate(req.body.password),			email : req.body.email
        });

        Users.save(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Users',
                    error: err
                });
            }
            return res.status(201).json(Users);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users',
                    error: err
                });
            }
            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }

            Users.username = req.body.username ? req.body.username : Users.username;			Users.password = req.body.password ? req.body.password : Users.password;			Users.email = req.body.email ? req.body.email : Users.email;
            Users.save(function (err, Users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Users.',
                        error: err
                    });
                }

                return res.json(Users);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        UsersModel.findByIdAndRemove(id, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
