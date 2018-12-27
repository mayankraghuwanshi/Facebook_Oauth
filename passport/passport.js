const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user')


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}, function(err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id','displayName' ,'name','gender','photos', 'hometown', 'profileUrl', 'emails']
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({facebook_id : profile._json.id} , function (err , user) {
            if(err){
                return done(err)
            }
            if(user){
                return done(null , user)
            }
            else{
                const newUser = new User({
                  facebook_id : profile._json.id,
                    firstname : profile._json.first_name,
                    lastname: profile._json.last_name,
                    email : profile._json.email
                })
                newUser.save(function (err) {
                    if(err){
                        return done(err)
                    }
                    return done(null , newUser)
                })

            }
        })
    }
));

module.exports = passport;