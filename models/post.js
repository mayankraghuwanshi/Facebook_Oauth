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
    },
    date : {
        type:Date,
        default : Date.now()
    },
    likes :[{ liker_id : {type:String, required : true },
              liker_name : {type:String, required :true }}],
    likes_count : {
        type :Number , default : 0
    },
    comments_count :{
        type : Number, default : 0
    },
    comments :[{
            comment : {type : String  , required : true},
            commenter : {type :String  , required : true},
            commenter_id : {type : String , required :true},

        flag : {
            type : Boolean,
            default : false
        }
    }],
    photo :{
        type: String,
    },
    category :{
        type: String,
    }
})

const post = module.exports = mongoose.model('post' , postSchema)

