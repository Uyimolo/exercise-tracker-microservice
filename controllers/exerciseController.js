const Exercise = require('../models/Exercise');
const User = require('../models/User');
const { validateDate, formatDate } = require('../utils/dateFunctions');

const createExercise = async (request, response) => {
  try {
    console.log(request.body);
    // Extract id from the request params
    const { _id } = request.params;
    // find user with that id
    const user = await User.findById(_id);

    if (!_id || !user) {
      // return an error message if _id is not present or if id does not belong to a valid user
      return response.status(400).json({ error: 'Invalid user Id.' });
    }

    // Extract description and duration from request body
    const {
      description,
      duration: durationInput,
      date: userDateInputValue = new Date().toISOString().split('T')[0],
    } = request.body;

    // Validate description and duration
    if (
      !description ||
      !durationInput ||
      isNaN(durationInput) ||
      Number(durationInput) < 0
    ) {
      return response.status(400).json({
        error:
          'Missing description or invalid duration. Duration must be a positive number.',
      });
    }

    const duration = Number(durationInput);

    const isDateValid = validateDate(userDateInputValue);

    // check if user provided date is valid
    if (userDateInputValue && !isDateValid) {
      return response
        .status(400)
        .json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    //  check if date is not greater than current date
    const userDate = userDateInputValue
      ? new Date(userDateInputValue)
      : new Date();

    const currentDate = new Date();
    if (userDate > currentDate) {
      return response
        .status(400)
        .json({ error: 'Date cannot be in the future.' });
    }

    //  set the date to dateString() format (if no date is specified by user, default to current date)
    const date = formatDate(userDateInputValue);

    // Create a new exercise object with the extracted data
    const { _id: userId, username } = user;
    const newExercise = new Exercise({
      description,
      duration,
      date: new Date(date),
      userId,
      username,
    });
    // save the new exercise in database
    await newExercise.save();

    // return json response with user object properties and exercise object properties
    return response.json({
      username,
      description,
      duration,
      date,
      _id: userId,
    });
  } catch (error) {
    // return an error message if an error occurs during the process
    return response.status(500).send('Server error.');
  }
};

const deleteExercisesAndUsers = async (request, response) => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});
    return response.json({
      message: 'All exercises and users have been deleted.',
    });
  } catch (error) {
    return response.status(500).send('Server error.');
  }
};

module.exports = { createExercise, deleteExercisesAndUsers };
