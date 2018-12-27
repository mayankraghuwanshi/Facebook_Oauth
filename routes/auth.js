const router  = require('express').Router()
const passport = require('../passport/passport')


router.get('/auth/facebook',
    passport.authenticate('facebook' ,  { scope: ['email']}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' , }),
    function(req, res) {
        res.redirect('/home');
    }
);
router.get('/auth/logout' , (req , res)=>{
    req.logout()
    req.flash('success' , 'Log out success')
    res.redirect('/home')
})

module.exports = router