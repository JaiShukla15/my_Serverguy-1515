const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const passport=require('passport');
const router=express.Router();

var User=require('../models/user');
//users
router.get('/login',(req,res)=>{
  res.render('users/login');
});
router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect:'/welcome',
    failureRedirect:'/users/login',
    failureFlash:true
})(req,res,next);
});
router.get('/logout',(req,res)=>{
req.logout();
req.flash('success_msg','You are Successfully Logged Out');
res.redirect('/users/login');
});
router.post('/',(req,res)=>{
   let errors=[];
   if(!req.body.name)
   {
       errors.push({text:'Please Enter Your Name'});
   }
   if(!req.body.email)
   {
       errors.push({text:'Please Enter Your Email'});
   }
   if(!req.body.password)
   {
       errors.push({text:'Password Should not be Blank'});
   }
   if(req.body.password!==req.body.cpass)
   {
       errors.push({text:'Password do not match'});
   }
    if(errors.length>0)
    {
       res.render('users/reg',{
           errors:errors,
           name:req.body.name,
           email:req.body.email,
           password:req.body.password,
           cpass:req.body.cpass
       });
    }
   else
   {
            var NewUser=new User({
                Name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
           
           bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,hash)=>{
              if(err){console.log(e);}
              NewUser.password=hash;
              NewUser.save().then((doc)=>{
                req.flash('success_msg','You are Successfully Signup');
                res.redirect('/welcome');
            }).catch(e=>console.log('Some Error ....',e));
        })})}});

router.get('/reg',(req,res)=>{
    res.render('users/reg');
});
module.exports=router;
