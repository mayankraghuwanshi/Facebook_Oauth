const router = require('express').Router()
const axios = require('axios')
const date_compare = require('../utils/date_compare')



router.get('/' ,async (req , res)=>{
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
  if(posts <= 0 ){
    req.flash('error', "No post found!")
  }
if(req.user && posts.length>0) {
  for(let i=0 ; i<posts.length;i++){
    posts[i].date = date_compare(new Date(posts[i].date) , new Date())
    if(posts[i].user._id === `${req.user._id}`){
      posts[i].meta.delete_flag = true
    }
    for(let j=0 ; j<posts[i].likes.length ; j++){
      if(posts[i].likes[j].liker_id === `${req.user._id}`){
        posts[i].meta.like_flag = true
      }
    }
  }
}
res.render('home' , {posts , title:"Home" })
})




//this is for testing
router.get('/test', async (req, res) => {
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
  if (posts <= 0) {
    req.flash('error', "No post found!")
  }
  if (req.user && posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].user._id === `${req.user._id}`) {
        posts[i].flag = true
      }
    }
  }
  res.render('index', {
    posts, title: "Home", helpers: {
      update: function (user, posts) {
        function template(post, user) {
          if (post.user._id === `${user._id}`) {
            return `<div class="card mb-4 mt-4">
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <a href="/post/find${post._id}" class="btn btn-primary">Read More &rarr;</a>
                </div>
                <div class="card-footer text-muted">
                    Posted ${post.date}, 2017 by
                    <a href="/user/find{{this.user._id}}">${post.user.firstname}</a>
                    <button>delete </button>
                </div>
            </div>`
          } else
            return `<div class="card mb-4 mt-4">
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <a href="/post/find${this._id}" class="btn btn-primary">Read More &rarr;</a>
                </div>
                <div class="card-footer text-muted">
                    Posted ${post.date}, 2017 by
                    <a href="/user/find{{this.user._id}}">${post.user.firstname}</a>
                    <button>delete </button>
                </div>
            </div>`
        }

        var fill = ``
        if (user) {
          if (posts) {
            for (let i = 0; i < posts.length; i++) {
              if (posts[i].user._id == user._id) {
                fill += template(posts[i], user)
              }
            }
          }
          return fill
        }
      }
    }
  })
})
/////////////////////////////////////////////////////////////////





router.get('/check' ,async (req , res)=>{
  const data = await axios.get('http://localhost:3000/post/getp')
  let posts = data.data
  res.render('check' , {posts , title:"Home"} )
})


module.exports = router