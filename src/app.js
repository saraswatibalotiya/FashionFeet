const express = require("express");
const path = require("path")//path for static folder
var bcrypt = require('bcrypt');
const hbs = require("hbs");//require hbs for path
const mongoose = require("mongoose");
var passport = require('passport')
const session = require('express-session');
const cookieParser = require('cookie-parser');
var MomentHandler = require("handlebars.moment");
var expressHbs = require('express-handlebars');
// var flash = require('connect-flash')
var flash = require('express-flash')
var validator = require('express-validator')
const MongoStore = require('connect-mongo')(session);
var moment = require('moment');

var cartroutes = require('../routes/cart');
var userRoutes = require('../routes/user');



const app = express();//app k andar sab express k methods aa jayege
const port = process.env.PORT || 3000;//give port no to server



//mogosee connection ---------------
require("./db/conn");//to make connection in mongodb

// wrtie collection and connect them
const Customer = require("./models/register")
const MenProduct = require("./models/menProduct");
const { json } = require("express");


//setting path
//express ko apna templates sb folder k bare m btao


//------------------- refer this code for static folder ------------------------------
// to use static folder where you have written html css file
//1st
// setting the path
const staticpath = path.join(__dirname, "../public");
// console.log(path.join(__dirname,"../public")); -- for checking path

//-----------------------------------------------------------------------------------

const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");





mongoose.connect('mongodb://localhost:27017/fashionfeet');


//shall be in sequence -------------------------------------------

app.use(cookieParser());

app.use(express.json());//for postman data in json format
app.use(express.urlencoded({ extended: false }));//data filled in form should get dont show undefined


app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    mongoStore: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }

}));


//passport config
const passportInit = require("../config/passport");
// const { Passport } = require("passport");
passportInit(passport)
app.use(passport.initialize()); //intialize passport in intialize method
app.use(passport.session()); // use session to store user 

// app.use(csrf()); // Security, has to be after cookie and session.
// app.use(flash()); //initialize flash after session
app.use(flash());

// flash
// it is used as a middleware for session

//Assets
app.use(express.static(staticpath))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Global Middleware
app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});


// to tell that we are using hbs
app.set("view engine", "hbs");
MomentHandler.registerHelpers(hbs);

//to include bootstrap css and js and jquery
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../public/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.set("views", templatepath);//set that views folder is inside templatepath
hbs.registerPartials(partialpath);//register for partials

require('../routes/web')(app)

hbs.registerHelper('formatDate', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

hbs.registerHelper('if_equal', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})

hbs.registerHelper('selected', function(option, value){
    if (option === value) {
        return ' selected';
    } else {
        return ''
    }
});


app.use('/', cartroutes);





//server create
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
