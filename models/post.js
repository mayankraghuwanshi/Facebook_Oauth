const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: {
        type : String ,
        required : true
    },
    content :{
        type: String,
        required: true
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: "User is required to add post "
    },
    flag:{
        type: Boolean,
        default: false
    }
    ,
    date : {
        type:Date,
        default : Date.now()
    }
    ,
    comments :[{
            comment : {type : String  , required : true},
            commenter : {type :String  , required : true},
            commenter_id : {type : String , required :true},

        flag : {
            type : Boolean,
            default : false
        }
    }]
})

const post = module.exports = mongoose.model('post' , postSchema)

