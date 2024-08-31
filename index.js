const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const logRoutes = require('./routes/logRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static('public'));

// frontend home view
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/hello', (request, response) => {
  response.send('Hello, World!');
});

app.use('/api', userRoutes);
app.use('/api', exerciseRoutes);
app.use('/api', logRoutes);

module.exports = app;
