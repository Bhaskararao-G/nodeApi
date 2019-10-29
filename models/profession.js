const mongoose = require('mongoose');

const Schema = mongoose.Schema

const professionSchema = new Schema({
	name: String,
	color: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('profession', professionSchema);