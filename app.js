const express = require('express'),
app = express();
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const User          = require('./models/user');
mongoose.connect("mongodb://localhost/sasemi",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'));
app.use(require("express-session")({
    secret:"HEHE",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/landing',(req,res)=>{
    res.render('landing.ejs');
});
app.post('/register',(req,res)=>{
    const userName =new User({username: req.body.username});
    User.register(userName,req.body.password,(err,user)=>{
        console.log(userName);
        if(err){
            console.log(err);
            return res.render('Fartist');
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect('landing');
            });
        }
    });
});
app.post('/login',passport.authenticate("local",{
    successRedirect:"/landing",
    failureRedirect:"/Fartist"
}),(req,res)=>{
    
});
app.get('/Fartist',(req,res)=>{
    res.render('Fartist');
});
app.get('/feed',(req,res)=>{
    res.render('home');
});
app.listen(process.env.PORT,process.env.IP,(req,res)=>{
    console.log('donzo');
});