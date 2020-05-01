const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema({
    user:{ // user ili habet taswira 
        type:Schema.ObjectId, 
        ref:"user"
    },
    image:{ // path imta3 taswira
        type: String,
    },
    product:{ // type (plastic,can,glass)
        type:String,
    },
    votes: [{ // liste imta3 les votes 
        user:{  // user ili vota
            type:Schema.ObjectId, 
            ref:"user"
        },
        vote:{ // vote imte3oou
            type:String,
            
        }
    }],
    date:{ // waktech tba3thit
        type:Date,
        default: Date.now
    }
});
module.exports = Data = mongoose.model('datas',DataSchema);
