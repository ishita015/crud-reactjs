const User = require('../model/user-info.vo');
const jwt = require('jsonwebtoken');

// Get all users
exports.getAll = (req, res, next) => {
    User.find({}, (err, users) => {
        res.status(200).json({
            message: 'get request for details',
            body: users
        });
    });
}

// Login and get user data
exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    email: data.email,
                    _id: data._id,
                    cell: data.cell,
                    name: data.firstName
                },
                    'secret',
                    {
                        expiresIn: "5h"
                    });
                res.status(201).json({
                    message: "Loged In",
                    body: data,
                    token: token
                });
            } else {
                res.status(201).json({
                    message: "Unauthorised",
                });
            }
        }).catch(err => {
            res.status(400).json({
                message: err,
            });
        })
}

// Add update user
exports.addUpdateUser = (req, res, next) => {
    console.log('vvvvvvvvv',req.body.firstName);
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // cell: req.body.cell,
        // email: req.body.email,
        // password: req.body.password
    });

    if (req.body._id) {
        console.log('id is',req.body._id);
        User.findByIdAndUpdate(req.body._id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            // cell: req.body.cell,
            // email: req.body.email,
            // password: req.body.password
        }, { new: true })
            .then(data => {
                res.status(201).json({
                    message: 'Data Updated successfully',
                    data: data
                });
            }).catch(err => {
                console.log(err);
            });
    }
    else {
        user.save()
            .then(data => {
                res.status(201).json({
                    message: 'Data added successfully', 
                    data: data
                });
            }).catch(err => {
                console.log(err);
            });
    }
}

// Delete Single User 
exports.deleteUser = (req, res, next) => {
    console.log("xxxxxxxxxxxxxxxxxxx xxxxxxxx delete init " + req.params._id);
    User.findByIdAndRemove(req.params._id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.status(201).json({
                message: 'Delete successfully',
                data: data
            });
        }).catch(err => {
            console.log(err);
        });
}