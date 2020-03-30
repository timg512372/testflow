const mongoose = require("mongoose");

const LabImport = new mongoose.Schema({
  labId: {
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

const LabImportModel = mongoose.model("LabImport", LabImport);
module.exports = LabImportModel;
