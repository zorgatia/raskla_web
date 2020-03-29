const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:       String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        //enum:['$2y$10$30Hw5RkvzRcSnqQrf8GIiuBvbDkVmEiy/pkmT3g/uJ/DXeRb3ffd2'] // remouve
    },
    birthday:{
        type: Date,
    },

    vends:[{
        type:Schema.ObjectId, 
        ref:"vend"
    }],
   
    role:{
        type: String,
        enum: ['USER','ADMIN'],  // remouve when rand
        default: 'USER'
    },
    comfirmed:{
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user',UserSchema);
