const User = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {
    getUsers(req, res) {
        User.find({}).populate('profession').exec((err, users)=> {
            if (!err) {
                res.send({
                    success: true,
                    msg: "User fetched successfully",
                    users: users
                })
            }
        })
    },
    createUser(req, res) {
        console.log('-----create user-----');
        var user = req.body;
        var professions = user.profession.map((item) => {
            return item.id;
        });

        User.findOne({phone: user.phone}, (err, userExists)=> {
            if (!err && userExists != null) {
                res.send({
                    success: false,
                    msg: "User already exists with this mobile number"
                })
            } else {
                var data = {
                    fname: user.firstName,
                    lname: user.lastName,
                    uname: user.username,
                    phone: user.phone,
                    password: user.password,
                    profession: professions
                }
                var new_user = new User(data);
                new_user.save((err, newUser)=> {
                    if (!err && newUser != null) {
                        res.send({
                            success: true,
                            msg: "User created successfully",
                            user: newUser
                        })
                    }
                })
            }
        })
    },
    userLogin(req, res) {
        let userData = req.body;
        
        User.findOne({ $or:[{ 'phone': userData.phone }, {'username': userData.phone}]}, (err, user)=> {
            if (err) {
                res.send({
                    success: false,
                    msg: "Error in Login"
                });
            } else {
                if (!user) {
                    res.send({
                        success: false,
                        msg: "Invalid email"
                    });				
                } else if (user.password !== userData.password) {
                    res.send({
                        success: false,
                        msg: "Invalid password"
                    });							
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey');
                    res.send({
                        success: true,
                        msg: "Login successful",
                        token: token,
                        user: user
                    });								
                }		
            }
        })
    },
    ActiveBlockUser(req, res) {
        let status = req.body.status === 1 ? 0 : 1;
        User.findOneAndUpdate({
            _id: req.body.id,
        }, {
            status: status,
        }, (err, doc) => {
            let status_text = doc.status === 1 ? "blocked" : "activated";
            if (err) {
                res.send({
                    success: false,
                    msg: "Something went wrong"
                })
            } else {
                res.send({
                    success: true,
                    msg: "User "+status_text+" successfully"
                })
            }
        });
    }
}