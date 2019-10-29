const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
	fname: { type: String },
	lname: { type: String },
	uname: { type: String },
	password: { type: String },
	gender: { type: String, default: null },
	age: { type: Number, default: null },
	phone: { type: Number },
	profession: [{ type: mongoose.Schema.Types.ObjectId, ref: 'profession' }],
	status: { type: Number, default: 1 }
	},{
		timestamps: true
	});

module.exports = mongoose.model('user', userSchema);