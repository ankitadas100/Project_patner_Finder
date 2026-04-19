import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'eventModel'
  },

  eventModel: {
    type: String,
    required: true,
    enum: ['RequirmentHackthon', 'RequirmentProject']
  },

  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});
const userApplication= mongoose.model("userApplication",ApplicationSchema);
export default userApplication;