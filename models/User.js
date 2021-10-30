const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    phoneNumber: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      required: true,
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
    },
    score: {
      type: Number,
      default: 0,
    },
    categorySelected: {
      type: String,
    },
    loginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
module.exports = mongoose.model("Candidate", UserSchema);

// {
//   "name": "Aman Tyagi",
//   "studentNumber" : "1910004",
//   "rollNumber" : "1900270100025",
//   "phoneNumber" : "6396952072",
//   "branch" : "CSE",
//   "email" : "amantyagi2k@gmail.com"
// }
