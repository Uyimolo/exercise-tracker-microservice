const Exercise = require('../models/Exercise');
const User = require('../models/User');

const getExerciseLogs = async (request, response) => {
  console.log(request.query);
  // get query params from request object
  const from = request.query.from ? new Date(request.query.from) : new Date(0);
  const to = request.query.to ? new Date(request.query.to) : new Date();
  const limit = parseInt(request.query.limit) || 0;

  // validate date format
  if (isNaN(from) || isNaN(to)) {
    return response.status(400).json({ error: 'Invalid date format' });
  }

  // get id from request parameters
  const { _id } = request.params;

  // check if user with _id exists
  const user = await User.findById(_id);
  if (!user) {
    return response.status(404).json({ error: 'User not found' });
  }

  // fetch exercise logs for user with _id
  const totalExerciseCount = await Exercise.countDocuments({ userId: _id });

  // Fetch exercise logs for the user with date filtering and limit
  const exercises = await Exercise.find({
    userId: _id,
    date: { $gte: from, $lte: to },
  })
    .limit(limit)
    .exec();

  // transform exercise logs for response
  const transformedExercises = exercises.map((exercise) => ({
    description: exercise.description,
    duration: Number(exercise.duration),
    date: new Date(exercise.date).toDateString(),
  }));

  const { username } = user;
  const count = totalExerciseCount;

  response.json({
    username,
    count,
    _id,
    log: transformedExercises,
  });
};

module.exports = getExerciseLogs;
