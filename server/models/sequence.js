import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sequenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  uid: {
    type: Number,
    default: 0,
  },
});

export const Sequence = model("Sequence", sequenceSchema);
