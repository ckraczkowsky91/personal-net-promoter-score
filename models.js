var mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    score: Number,
    strength: String,
    weakness: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String
  }
);

const Submission = mongoose.model('Submission', submissionSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Submission, User };
