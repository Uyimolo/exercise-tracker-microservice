const User = require('../models/User');

// create a new user
const createUser = async (request, response) => {
  try {
    const { username } = request.body;
    // check if a user with the username already exists
    let user = await User.findOne({ username });
    //   if user exists return existing user with username and _id fields present
    if (user) {
      return response
        .status(200)
        .json({ username: user.username, _id: user._id });
    } else {
      // create a new user
      user = new User({ username });
      await user.save();
      // return the newly created user with the username and id fields present
      response.status(201).json({ username: user.username, _id: user._id });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
};

// get an array of all users
const getAllUsers = async (request, response) => {
  try {
    // find all users in the database
    const users = await User.find({});

    // return the transformed users as an array of objects with username and _id properties
    const transformedUsers = users.map((user) => ({
      username: user.username,
      _id: user._id,
    }));
    return response.status(200).json(transformedUsers);
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
