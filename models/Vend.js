const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VendSchema = new Schema({
    user: { // user ili a3mal vend
        type: Schema.ObjectId,
        ref: 'user',
        childPath:'vend'   
    },
    vending:{ // makina ili a3malfeha vends
        type: Schema.ObjectId,
        ref: 'vending',
        childPath:'vend'
    },
    qr:{type:String}, // qr code ili nech tsajlou makina imba3d ki tab3athli qrcode wel user nafek user fih
    
    products:[{ // les produit ili hathom fil machina
        product:{
            type:String,
        },
        image:{
            type:String
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
   
});


module.exports = Vend = mongoose.model('vend',VendSchema);
