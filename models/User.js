const mongoose = require('mongoose');

// Create a mongoose schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

// create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

