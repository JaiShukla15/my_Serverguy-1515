const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const user=new Schema({
Name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
  type:String,
  required:true,
  minlength:6
},
Submitted:{
    type:Date,
    default:Date.now()
}
});
const User=mongoose.model('User',user);
module.exports=User;