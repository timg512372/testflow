const mongoose = require("mongoose");

const HospitalExport = new mongoose.Schema({
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

const HospitalExportModel = mongoose.model("HospitalExport", HospitalExport);
module.exports = HospitalExportModel;
