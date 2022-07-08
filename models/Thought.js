const { model, Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dataFormat");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    
    username: {
      type: String,
      required: true,
    },
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);