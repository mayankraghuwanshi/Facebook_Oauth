const router = require('express').Router()
const axios = require('axios')
const date_compare = require('../utils/date_compare')


//@Route /
//Desc To serve posts at home page
//Public

router.get('/x' ,async (req , res)=>{
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
    if(posts.length <= 0 ){
    req.flash('error', "No post found!")}
    if(req.user && posts.length>0) {
        for(let i=0 ; i<posts.length;i++){
            posts[i].date = date_compare(new Date(posts[i].date) , new Date())
              if(posts[i].user._id === `${req.user._id}`){
                  posts[i].meta.delete_flag = true}
                      for(let j=0 ; j<posts[i].likes.length ; j++){
                        if(posts[i].likes[j].liker_id === `${req.user._id}`){
                           posts[i].meta.like_flag = true }}}}
    else{
            for(let i=0 ; i<posts.length;i++){
    posts[i].date = date_compare(posts[i].date)}}
res.render('home' , {posts , title:"Home" })
})
router.get('/' ,(req , res)=>{

  res.render('addpost' )
})


module.exports = router