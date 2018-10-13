var jwt = require('jsonwebtoken'),
    config = require('../config/database'),
    User = require('../models/user');

var userLogin = (req, res, next) => {
    var email = req.body.email,
        password = req.body.password;
    console.log(req.body);

    User.findOne({email: email}, (err, user) => {
        if(err) {
            console.log(err);
        }
        else if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User dont exist'
            });
        } else {
            console.log(user);
            User.comparePassword(password, user.password, (err, match) => {
                if(err) {

                } else if(match) {
                    var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: config.tokenexp});
                    return res.status(201).json({success: true, token , user});
                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'password don\'t match'
                    });
                }
            });
        }
    });
}

var userAuthenticate = (req, res, next) => {
    var token = req.body.token || req.headers['authorization'];
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                res.status(400).json({
                    message: err
                })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: 'You have not given token'
        });
    }
}

var adminAuthenticate = (req, res, next) => {

    console.log('admin authenticate');
    var token = req.body.token || req.headers['authorization'];

    console.log('Here bal '+token);


    if(token) {

        // console.log(token);
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                return res.status(201).json({
                    success: false,
                    message: err
                });
            } else {
                var user = decoded._doc;
                console.log(user);
                if( user.isAdmin == true ) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.status(201).json({
                        success: false,
                        message: 'Invalid Admin Id'
                    });
                }
            }
        });
    } else {
        return res.status(201).json({
            success: false,
            message: 'Invalid Admin credentials'
        });
    }
}

module.exports = {
    userLogin,
    userAuthenticate,
    adminAuthenticate
}