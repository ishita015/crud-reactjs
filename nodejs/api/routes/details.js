const express = require('express');
const router = express.Router();
const User = require('../model/user-info.vo');
const mongoose = require('mongoose');
const conDetails = require('../controller/con-details');

// Get all users
router.get('/', conDetails.getAll);

// Login and get user data
router.post('/login', conDetails.loginUser);

// Add update user
router.post('/', conDetails.addUpdateUser);


//TODO Get single user By id 
/* router.get('/', (req, res, next) => {
	const id = req.params.id;
	if (id == "vin") {
		res.status(200).json({
			message: 'Name is vinay patidar'
		});

	}
	else {
		res.status(200).json({
			message: 'Wrong Id'
		});
	}
}); */

// Delete Single User 
router.delete('/:_id', conDetails.deleteUser);


module.exports = router;