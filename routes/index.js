var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var config=require('../config');
var transporter=nodemailer.createTransport(config.mailer);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Platform for sharing code' });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Platform for sharing code' });
});

router.route('/contact')
.get( function(req, res, next) {
  res.render('contact', { title: 'Platform for sharing code' });
})
.post(function(req,res,next){
  req.checkBody('name','Empty name').notEmpty();
  req.checkBody('email','Invaliad Email').isEmail();
  req.checkBody('message','Empty Message').notEmpty();
  var errors=req.validationErrors();
  if(errors){
    res.render('contact',{
      title:'Platform for sharing code',
      name:req.body.name,
      email:req.body.email,
      message:req.body.message,
      errorMessage:errors
    });
  }else{
    var mailOptions={
      from:'v-Share <noreply@v-share.com>',
      to:'viveksingh27795@gmail.com',
      subject:"You got new message from visitor",
      text:req.body.message

    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error) console.log(error);
        res.render('thank', { title: 'Platform for sharing code' });
    });

    
  }
 
});

module.exports = router;
