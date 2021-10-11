const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    studentNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasAppeared: {
      type: Boolean,
      default: false,
    },
    isHostler: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    categorySelected: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
module.exports = mongoose.model("Candidate", UserSchema);
