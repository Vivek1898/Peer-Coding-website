var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var FaceBookStrategy=require('passport-facebook').Strategy;
var GoogleStrategy=require('passport-google-oauth2').Strategy;
//New Sessions

passport.serializeUser(function(user,done){
    done(null,user._id);
});

//Accept Session
passport.deserializeUser(function(id,done){
    User.findOne({_id:id},function(err,user){
        done(err,user);
    })
});

 passport.use(new LocalStrategy({
     usernameField:'email'
 },
//Valiadatinf Uname And Password
 function(username,password,done){
     User.findOne({email:username},function(err,user){
         if (err) return done(err);
         if(!user){
             return done(null,false,{
                 message:'Incorrect Usename or Password'
             });
            }
             if(!user.validPassword(password)){
                 return done(null,false,{
                    message:'Incorrect Usename or Password'
                 })
             }
         return done(null,user);
     })
 }

 ));

 passport.use(new GoogleStrategy({
   clientID:'319286215072-7errald918lgovgk04r19mjlf1pmq0su.apps.googleusercontent.com',
   clientSecret:'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',
   callbackURL:'http://localhost:3000/auth/google/callback',
   profileFields:['id','displayName','email']
 },function(token,refreshToken,profile,done){
   User.findOne({'googleId':profile.id},function(err,user){
       if(err) return done(err);
       if(user) {
           return done(null,user);
       }else{
           User.findOne({email:profile.emails[0].value},function(err,user){
               if(user){
                   user.googleId=profile.id 
                   return user.save(function(err){
                       if(err) return done(null,false,{message:"Can't Save User"});
                       return done(null,user);
                   })
               }
               var user= new User();
               user.name=profile.displayName;
               user.email=profile.emails[0].value;
               user.googleId=profile.id
               user.save(function(err){
                if(err) return done(null,false,{message:"Can't Save User"});
                return done(null,user);
               })
           })
       }
   })
   }

 ));



 passport.use(new FaceBookStrategy({
    clientID:'626484531785022',
    clientSecret:'e4b6e2f045de594ffe87197db84f6d91',
    callbackURL:'http://localhost:3000/auth/facebook/callback',
    profileFields:['id','displayName','email']
  },function(token,refreshToken,profile,done){
    User.findOne({'facebookId':profile.id},function(err,user){
        if(err) return done(err);
        if(user) {
            return done(null,user);
        }else{
            User.findOne({email:profile.emails[0].value},function(err,user){
                if(user){
                    user.facebookId=profile.id 
                    return user.save(function(err){
                        if(err) return done(null,false,{message:"Can't Save User"});
                        return done(null,user);
                    })
                }
                var user= new User();
                user.name=profile.displayName;
                user.email=profile.emails[0].value;
                user.facebookId=profile.id
                user.save(function(err){
                 if(err) return done(null,false,{message:"Can't Save User"});
                 return done(null,user);
                })
            })
        }
    })
    }
 
  ));




