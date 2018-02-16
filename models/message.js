const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  room: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  sentAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message',MessageSchema);