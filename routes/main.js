const router = require('express').Router()
const axios = require('axios')
const exphbs = require('express-handlebars')
router.get('/index' ,async (req , res)=>{
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
  if(posts <= 0 ){
    req.flash('error', "No post found!")
  }
if(req.user && posts.length>0) {
  for(let i=0 ; i<posts.length;i++){
    if(posts[i].user._id == req.user._id){
      posts[i].flag = true
    }}}
res.render('home' , {posts , title:"Home"} )
})

router.get('/check' ,async (req , res)=>{
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
  res.render('check' , {posts , title:"Home"} )
})




module.exports = router