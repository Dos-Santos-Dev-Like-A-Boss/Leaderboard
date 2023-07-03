const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
  },
  records: [
    {
      game: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;