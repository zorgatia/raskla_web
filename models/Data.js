const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema({
    user:{
        type:Schema.ObjectId, 
        ref:"user"
    },
    path:{
        type: String,
    },
    product:{
        type:Schema.ObjectId, 
        ref:"product"
    },
    votes: [{
        user:{
            type:Schema.ObjectId, 
            ref:"user"
        },
        vote:{
            type:String,
            enum:['YES','NO']
        }
    }],
    date:{
        type:Date,
        default: Date.now
    }
});
module.exports = Data = mongoose.model('data',DataSchema);
