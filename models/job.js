const mongoose = require('mongoose');
const Schema = mongoose.Schema

const jobSchema = new Schema({
	title: String,
	description: String,
	location: String,
	images: String,
	type: { type: mongoose.Schema.Types.ObjectId, ref: 'profession' },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: Number, default: 0 },
	accept: { type: Number, default: 1 },
	createdTime: { type : Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('job', jobSchema);