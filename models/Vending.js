const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VendingSchema = new Schema({
  numero: {
    type: String
  },
  model: {
    type: String
  },
  status: {
    type: String,
    enum: ["ON", "OFF", "FULL"],
    default: "OFF"
  },
  region: {
    type: String
  },
  loc: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  vends: [
    {
      type: Schema.ObjectId,
      ref: "vend"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vending = mongoose.model("vending", VendingSchema);
