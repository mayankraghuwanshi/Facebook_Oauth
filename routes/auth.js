const router  = require('express').Router()
const passport = require('../passport/passport')


router.get('/auth/facebook',
    passport.authenticate('facebook' ,  { scope: ['email' ]}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' , }),
    function(req, res) {
    req.flash('success' , "You are loged in :)")
        res.redirect('/index');
    }
);
router.get('/auth/logout' , (req , res)=>{
    req.logout()
    req.flash('success' , 'You are Loged out :(')
    res.redirect('/index')
})

module.exports = router