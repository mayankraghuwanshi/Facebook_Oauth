const router  = require('express').Router()
const Post = require('../models/post')

router.get('/getp' , (req , res)=>{
    Post.find({}).populate('user').then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send((err))
    })
})
router.post('/putp' , (req , res)=>{
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
        req.flash('error' , err)
        res.redirect('/index')
    })
})

router.get('/find:id' , (req , res)=>{
    Post.findOne({_id:req.params.id}).populate('user').then((post)=>{
        res.render('post' , {post})
    }).catch((err)=>{
        res.send(err)
    })

})
router.post('/add_c:id' , async (req , res)=>{
    if(req.body.comment === null){
        req.flash('error' , "Please enter a valid comment!")
        res.redirect(`/post/find${req.params.id}`)
    }
    else{
    const data = await Post.findOne({_id : req.params.id})
    data.comments.push({ comment: req.body.comment , commenter : req.user.firstname , commenter_id : req.user._id})
    data.save().then((data)=>{
        req.flash('success' , "comment has added.")
        res.redirect(`/post/find${req.params.id}`)
    }).catch((err)=>{
        req.flash('error' , 'Something went wront while adding somment!')
        req.redirect(`/post/find${req.params.id}`)
    })

}})

module.exports = router