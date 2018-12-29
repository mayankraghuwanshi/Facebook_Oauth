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
    date : {
        type:Date,
        default : Date.now()
    },
    likes :[{ liker_id : {type:String, required : true },
              liker_name : {type:String, required :true }}],

    comments :[{
            comment : {type : String  , required : true},
            commenter : {type :String  , required : true},
            commenter_id : {type : String , required :true},
    }],
    photo :{
        type: String,
    },
    category :{
        type: String,
    },
    meta : {
        likes_count : {
            type :Number , default : 0
        },
        comments_count :{
            type : Number, default : 0
        },
        delete_flag:{
            type: Boolean,
            default: false
        },
        like_flag :{
            type: Boolean,
            default: false
        }
    }

})

function date() {
    let date = new Date()
    let day , month , hours,year , time;
    day = date.getDate()
    month = date.getMonth()+1
    hours = date.getHours()
    year = date.getFullYear()
    minuts = date.getMinutes()
    if(hours===0){
        time = `${hours+1}:${minuts} AM`
    }else if(hours >12){
        time = `${hours-12}:${minuts} PM`
    }
    return `${day}/${month}/${year} - ${time}`
}

const post = module.exports = mongoose.model('post' , postSchema)

