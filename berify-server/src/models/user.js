const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: {
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
  address: {
    type: String,
    unique: true,
    required: true
  },
  privateKey: {
    type: String,
    unique: true,
    require: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
