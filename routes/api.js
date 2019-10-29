const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users_ctrl = require('../controllers/users_ctrl');
const job_ctrl = require('../controllers/job_ctrl');



function verifyToken(req, res, next) {
    console.log(req.headers.authorization);
	if (!req.headers.authorization) {
		return res.status(401).send('Unauthorized request');
	}
    let token = req.headers.authorization.split(' ')[1]
    console.log(token);
	if (token === 'null') {
		return res.status(401).send('Unauthorized request');
	} else {
        let payload = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.subject
        next();
    }

}

router.post('/add_user', users_ctrl.createUser);
// router.get('/get_users', verifyToken, users_ctrl.getUsers);
router.get('/get_users', users_ctrl.getUsers);
router.post('/login', users_ctrl.userLogin);
router.post('/create_job',verifyToken, job_ctrl.createJob);
// router.get('/get_jobs',verifyToken, job_ctrl.getJobs);
router.get('/get_jobs', job_ctrl.getJobs);

// router.post('/register', (req, res)=> {
// 	let userData = req.body;
// 	let user = new User(userData);

// 	user.save((err, newUser)=> {
// 		if (err) {
// 			res.status(500).send("Error in registration");
// 		} else {
// 			let payload = { subject: newUser._id }
// 			let token = jwt.sign(payload, 'secretKey');
// 			res.status(200).send({token});			
// 		}
// 	})
// })

// router.post('/login', (req, res)=> {
// 	let userData = req.body;
	
// 	User.findOne({ email: userData.email }, (err, user)=> {
// 		if (err) {
// 			res.status(500).send("Error in login");
// 		} else {
// 			if (!user) {
// 				res.status(401).send("Invalid email");				
// 			} else if (user.password !== userData.password) {
// 				res.status(401).send("Invalid password");								
// 			} else {
// 				let payload = { subject: user._id }
// 				let token = jwt.sign(payload, 'secretKey');
// 				res.status(200).send({token});								
// 			}		
// 		}
// 	})
// })


// router.get('/events', (req, res)=> {
// 	let events = [
// 		{
// 			"_id": 1,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 2,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 3,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 4,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 5,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 6,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 7,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		}
// 	]
// 	res.json(events);
// })

// router.get('/special', verifyToken, (req, res)=> {
// 	console.log('userId',req.userId);
// 	let events = [
// 		{
// 			"_id": 1,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 2,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 3,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 4,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 5,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 6,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		},
// 		{
// 			"_id": 7,
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23T18:25:43.511Z"
// 		}
// 	]
// 	res.json(events);
// })


module.exports = router;