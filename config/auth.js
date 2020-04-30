const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    dotenv = require('dotenv').config(),
    User = require("../model/user");
   

    
    module.exports = function(passport) {
        var opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("JWT");
        opts.secretOrKey = process.env.SECRET;       
        passport.use(new JwtStrategy(opts, function(jwt_payload, done) {   
            // console.log(jwt_payload)        

          User.findById({_id: jwt_payload._id}, function(err, user) {
                if (err) {
                    console.log(err)
                    return done(err, false);
                }
                if (user) {                    
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        }));
      };

    