const mongoose = require('mongoose');
// Create user collection rules
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	age: {
		type: Number,
		min: 18,
		max: 80
	},
	password: String,
	email: String,
	hobbies: [ String ]
});

// Create a collection and return to the collection constructor
const User = mongoose.model('User', userSchema);

module.exports = User;