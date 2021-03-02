const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    mostRecentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message',
    },
  },
  { timestamps: true }
);

module.exports = Conversation = mongoose.model(
  'conversation',
  conversationSchema
);
