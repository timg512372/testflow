const mongoose = require("mongoose");

const Batch = new mongoose.Schema({
  factoryId: {
    type: String,
    required: true
  },
  QRs: {
    type: Array,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const BatchModel = mongoose.model("Batch", Batch);
module.exports = BatchModel;
