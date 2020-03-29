const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VendSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        childPath:'vend'   
    },
    vending:{
        type: Schema.ObjectId,
        ref: 'vending',
        childPath:'vend'
    },
    products:[{
        type: Schema.ObjectId,
        ref: 'product'
    }],
    date:{
        type: Date,
        default: Date.now
    }
   
});

VendSchema.plugin(relationship, { relationshipPathName:['user','vending'] });

module.exports = Vend = mongoose.model('vend',VendSchema);
