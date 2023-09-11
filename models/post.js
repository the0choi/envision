const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
  prompt: {
    type: String,
    trim: true,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);