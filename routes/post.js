const router  = require('express').Router()
const Post    = require('../models/post')

function Logcheck(req , res ,next) {
    if(!req.isAuthenticated()){
        req.flash('error' , 'please login first')
        res.redirect('/')}
    else{
        next()}}


router.get('/getp' , (req , res)=>{
    Post.find({}).populate('user').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send((err))
    })
})
router.get('/add', Logcheck, (req , res)=>{
    res.render('addpost')
})
router.post('/add' ,Logcheck, (req , res)=>{
    const data = new Post({
        title : req.body.title,
        content : req.body.content,
       user: req.user._id,
        photo : req.body.photo,
        category : req.body.category
    })
    data.save().then((data)=>{
        req.flash('success' , "Youre post is added.")
        res.redirect(`/post/find${data._id}`)
    }).catch((err)=>{
        req.flash('error' , 'Something went wrong while adding post :(')
        res.redirect('/')
    })
})

router.get('/find:id' , (req , res)=>{
    Post.findOne({_id:req.params.id}).populate('user').then((post)=>{
        res.render('post' , {post})
    }).catch((err)=>{
        res.send(err)
    })

})
router.post('/add_c:id' ,Logcheck, async (req , res)=>{
    if(req.body.comment === null){
        req.flash('error' , "Please enter a valid comment!")
        res.redirect(`/post/find${req.params.id}`)
    }
    else{
    const data = await Post.findOne({_id : req.params.id})
    data.comments.push({ comment: req.body.comment , commenter : req.user.firstname , commenter_id : req.user._id})
        data.meta.comments_count +1;
    data.save().then((data)=>{
        req.flash('success' , "comment has added.")
        res.redirect(`/post/find${req.params.id}`)
    }).catch((err)=>{
        req.flash('error' , 'Something went wront while adding somment!')
        req.redirect(`/post/find${req.params.id}`)
    })

}})

router.get('/delete:id' ,Logcheck, (req , res)=>{
    Post.findOne({_id : req.params.id}).then((data)=>{
        if(data.user._id.equals(req.user._id)){
            Post.remove({_id : req.params.id}).then((data)=>{
                req.flash('success' , "Post Deleted.")
                res.redirect('/')
            }).catch((err)=>{
                req.flash('error' , 'Error while deleting post!')
            })}
        else{
            req.flash('error' , "You can't delete this post")
            res.redirect(`/post/find${req.params.id}`)}
    }).catch((err)=>{
                req.flash('error' , 'Error while fetching post')
                  res.redirect(`/post/find${req.params.id}`)
    })
})

router.get('/like:id' , Logcheck ,async (req , res)=>{
   let post = await Post.findOne({_id : req.params.id});
   if(!post) {
       req.flash('error', "Not able to fetch post ")
       res.redirect(`/post/find${req.params.id}`)
   }else{
       let flag = false;
      for(let i=0 ; i<post.likes.length;i++){
            if(req.user._id.equals(post.likes[i].liker_id)){
                flag = true;
            }}
      if(flag){
          //dislike
          post.likes.pop({liker_id : req.user._id , liker_name : req.user.firstname})
          post.meta.likes_count = post.meta.likes_count-1;
          post.save().then((data)=>{
              req.flash('success' , "Downvoted.")
              res.redirect('/')
          }).catch((err)=>{
              req.flash('error' , 'something went wrong while Disliking!')
              res.redirect('/')
          })}
      else{
          //like
          post.likes.push({liker_id : req.user._id , liker_name : req.user.firstname})
          post.meta.likes_count = post.meta.likes_count+1;
          post.save().then((data)=>{
              req.flash('success' , "Upvoted.")
              res.redirect('/')
          }).catch((err)=>{
                  req.flash('error' , 'something went wrong while liking!')
                  res.redirect('/')
          })}}})

router.get('/getpost' , (req , res)=>{
    Post.find({}).populate('user').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send((err))
    })
})


module.exports = router