const session=require('express-session');
const express=require('express');
const flash=require('connect-flash');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const passport=require('passport');
mongoose.Promise=global.Promise;
//mongoose.connect('mongodb://localhost:27017/Ideas');
mongoose.connect('mongodb://Jai151515:pass1515@ds161121.mlab.com:61121/serverguy').then(db=>console.log('Connected')).catch(e=>console.log("something Wrong"));
const app=express();
require('./config/passport')(passport);
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error = req.flash('error');
   res.locals.user=req.user || null;
    next();
});
app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//users
const  Users=require('./routes/users');
app.use('/users',Users);
//index page
app.get('/welcome',(req,res)=>{
res.render('github');
});
app.get('/',(req,res)=>{
res.render('index',{
    title:'Welcome'
});
});
const port=process.env.PORT || 3000;
app.listen(port,()=>{
console.log("Server is running at 3000");
});