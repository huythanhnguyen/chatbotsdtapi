// server/server.js
require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/env');

const PORT = config.PORT;

// Connect to MongoDB
mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });