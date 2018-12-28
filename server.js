const express = require('express')
const server = express()
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv').config()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const hbs  = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')




mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASS}@ds125322.mlab.com:25322/blogauth`)
server.engine('hbs', hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
}))
server.set('views' ,  __dirname + '/views')
server.set('view engine' , 'hbs')
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(session({ secret: "cats" }));
server.use(express.static(path.join(__dirname , 'public')))
server.use(passport.initialize());
server.use(passport.session());
server.use(flash())
server.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.user = req.user || null;
    next();
});

function Logcheck(req , res ,next) {
    if(!req.isAuthenticated()){
        req.flash('error' , 'please login first')
        res.render('home')
    }
    else{
        next()}
}

server.get('/home' , Logcheck , (req , res)=>{
    res.render('home')
})
server.use('/post' , require('./routes/post'))
server.use('/' , require('./routes/auth'))
server.use('/' , require('./routes/main'))
server.get('/privacy' , (req , res)=>{
    res.render('privacy')
})
server.listen(process.env.PORT || 3000, ()=>{
    console.log("http://localhost:3000/auth/facebook\nhttp://localhost:3000")
})