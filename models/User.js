const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { // genere mil email imta3 user 
        type: String,
    },
    email:{  // he4a ili  ya3mil bih login
        type: String,
        required: true,
        unique: true
    },
    password: { // password
        type: String,
        //required: true,
        //enum:['$2y$10$30Hw5RkvzRcSnqQrf8GIiuBvbDkVmEiy/pkmT3g/uJ/DXeRb3ffd2'] // remouve
    },
    birthday:{ //date naissance (option)
        type: Date,
    },

    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    region:{
        type:String
    },
    gender:{
        type:String
    },
    phone:{
        type:String
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/ebniecolo/image/upload/v1566554496/users/default.jpg"
    },
    credit:{ // 9adech 3andou floussss
        type:Number,
        default:0
    },

    vends:[{  // les vends ili a3malhom 
        type:Schema.ObjectId, 
        ref:"vend"
    }],
   
    role:{ // juste lil ena lilp arti site web
        type: String,
        enum: ['USER','ADMIN'],  // remouve when rand
        default: 'USER'
    },
    comfirmed:{ // tawhiya mahtou true ken tesha9ha fil 5idma koli
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user',UserSchema);
