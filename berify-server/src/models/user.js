const mongoose = require("mongoose");

const User = new mongoose.Schema({
  institution: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    unique: true,
    required: true
  },
  privateKey: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
