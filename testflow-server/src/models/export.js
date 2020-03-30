const mongoose = require("mongoose");

const Export = new mongoose.Schema({
  factoryId: {
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

const ExportModel = mongoose.model("Export", Export);
module.exports = ExportModel;
