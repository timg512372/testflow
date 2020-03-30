const mongoose = require("mongoose");

const Import = new mongoose.Schema({
  hospitalId: {
    type: String,
    required: true
  },
  testId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const ImportModel = mongoose.model("Import", Import);
module.exports = ImportModel;
