var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

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
     User.findOne({email:username},function(err,done){
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

 ))