let User = require('../models/user');

let createUser = (req, res, next) => {

    var name = req.body.name,
        email = req.body.email,
        userName = req.body.username,
        password = req.body.password

    var myUser = new User({
        name: name,
        email: email,
        username: userName,
        password: password
    });

    User.addUser(myUser, (err, user) => {
        if (err) {
            res.status(404).json({
                'message': err
            })
        } else {
            res.status(201).json({
                success:true,
                user
            })
        }

    });
};


let getUser = (req, res, next) => {
    User.find({name: req.params.id}, (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: User
            });
        }
    });
}

let getAllUser = (req, res, next) => {
    User.find( (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: User
            });
        }
    });
}

var updateUser = (req, res, next) => {
    var name = req.body.name,
        email = req.body.email,
        userName = req.body.username

    User.findById(req.params.id, (err, User) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            User.name = name || User.name;
            User.email = email || User.email;
            User.username = userName || User.username;

            User.save((err, user) => {
                if(err){
                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user
                    });
                }
            });
        }
    });
}


let deleteUser = (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "User deleted",
                success: true
            });
        }
    });
}

module.exports = {
    createUser,
    deleteUser,
    getAllUser,
    getUser,
    updateUser
}