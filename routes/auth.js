var express = require('express');
var router = express.Router();
var passport=require('passport');
const user = require('../models/user');

router.route('/login')
.get(function(req,res,next){
    res.render('login',{title:'Login to account'});
  })
  .post(passport.authenticate('local',{
      failureRedirect:'/login'
  }),function(req,res){
      res.redirect('/');
  });
  
  router.route('/register')
  .get(function(req,res,next){
    res.render('register',{title:'Register a new account'});
  })
  .post(function(req,res,next){
      req.checkBody('name','Empty Name').notEmpty();
      req.checkBody('email','Empty Email').isEmail();
      req.checkBody('password','Empty Password').notEmpty();
      req.checkBody('password','Password do not match').equals(req.body.confirmPassword).notEmpty();

      var errors=req.validationErrors();
      if(errors){
          res.render('register',{
              name:req.body.name,
              email:req.body.email,
              errorMessage:errors
          });
      }else{
          //Sucess
          var user=new User();
          user.name=req.body.name;
          user.email=req.body.email;
          user.setPassword(req.body.password);
          user.save(function(err){
              if(err){
                  res.render('register',{errorMessages:err});

              }else{
                  res.redirect('/login');
              }
          })


      }
  });

  router.get('/logout',function(req,res){
      req.logout();
      res.redirect('/');
  });

  router.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
  router.get('/auth/facebook/callback',passport.authenticate('facebook',{
      successRedirect:'/',
      failureRedirect:'/'
  }));

  router.get('/auth/google',passport.authenticate('google',{scope: ["profile", "email"]}));
  router.get('/auth/google/callback',passport.authenticate('google',{
      successRedirect:'/',
      failureRedirect:'/'
  }));


  module.exports=router;