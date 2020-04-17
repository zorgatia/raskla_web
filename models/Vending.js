const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const VendingSchema = new Schema({
  numero: { // numero imta3mekina uniq za3ma za3ma id imta makina na5tarou ena
    type: String
  },
  model: { // mana3ch ich bech na3milbeha fil parti admin
    type: String
  },
  status: {
    type: String,
    enum: ["ON", "OFF", "FULL"],
    default: "OFF"
  },
  region: { // Tunsi,Sousse,Nabel ......
    type: String
  },
  adress:{ // exple Geant Tunis, Carfour Maraa , monoprix menzeh6
    type:String
  },
  loc: { // ta3rafha geoloc
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  vends: [ //les vend il sasou fil nmakina
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
