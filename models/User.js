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
    },
    rollNumber: {
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
      require: true,
      min: 6,
    },
    score: {
      type: Number,
      required: true,
    },
    categorySelected: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
module.exports = mongoose.model("Candidate", UserSchema);

// {
//     "name":"aditi",
//     "studentNumber":"190238",
//     "rollNumber":"190012930178",
//     "email":"aditi@gmail.com",
//     "phoneNumber":"8988786757",
//     "branch":"cse",
//     "residency":"hostel",
//     "isAdmin":"false"
// }
