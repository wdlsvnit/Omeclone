const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  room: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Conversation', ConversationSchema);