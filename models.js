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

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Submission };
