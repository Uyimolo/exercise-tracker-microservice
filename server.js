const app = require('.');
const connectDB = require('./config/db');

// connect to database
connectDB();

// create server
app.listen(3000, () => {
  try {
    console.log('Server is running on port 3000');
  } catch (error) {
    console.error('Error starting server:', error);
  }
});
