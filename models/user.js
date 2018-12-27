const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    facebook_id:{
     type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type:String,
        unique:true,
        required:true
    },

    date: {
        type: Date,
        default : Date.now()
    }
    ,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'post',
    }]

})
const user = module.exports = mongoose.model('user', userSchema);
