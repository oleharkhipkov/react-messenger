const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    body: {
      type: String,
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model('message', messageSchema);
