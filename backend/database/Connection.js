const mongoose = require('mongoose');

const connection = () => {
  return mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
};

module.exports = connection;
