const LocalStrategy = require('passport-local').Strategy
const User = require('../src/models/register')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email })
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Invalid Credentials' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    //serializeuser is use to store userid to session.
    passport.serializeUser((user, done) => {
        done(null, user._id)//here we are passing id to store _id in session
    })



    //deserialize user is use to call the userid from session
    passport.deserializeUser((id, done) => { // here id given is the id sotere in the session
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })



}

module.exports = init





















// var passport = require('passport');
// var user = require('../src/models/user');
// var LocalStrategy = require('passport-local').Strategy;
// // var bcrypt = require('bcryptjs');



// // function init(passport,getUserByEmail,getUserById){
// //     const authenticator = async(email,password,done) =>{

// //         const user = getUserByEmail(email);

// //         if(user == null)
// //         {
// //             return done(null,false,{message:"Wrong Email Address"})
// //         }

// //         try{
// //             if(await bcrypt.compare(password,user.password))
// //             {
// //                 return done(null,user);
// //             }
// //             else{
// //                 return done(null,false,{message:"Password is Incorrect"})
// //             }

// //         }
// //         catch(e){
// //             return done(e);
// //         }

// //     }
// //     passport.use(new LocalStrategy({usernameField: 'email'},authenticator))

// //     passport.serializeUser((email,done)=>{
// //         done (null,user.id)
// //     })
// //     passport.deserializeUser((id,done)=>{
// //         done(null,getUserById(id));
// //     })

// // }

// // module.exports = init;


// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });


// passport.use('local.signup', new LocalStrategy({
//     emailField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, function (req, email, password, done) {
//     // process.nextTick(function () {
//     User.findOne({ 'email': email }, function (err, user) {
//         if (err) {
//             return done(err);
//         }
//         if (user) {
//             return done(null, false, { message: 'Email is already taken.' });
//         }
//         var newUser = new User();
//         newUser.email = email;
//         newUser.password = newUser.encryptPassword(password);
//         newUser.save(function (err, result) {
//             if (err) {
//                 return done(err);
//             }
//             return done(null, newUser);
//         });
//         // });
//     });
// }));
// /*

// // passport.use('local.signin', new LocalStrategy({
// //     usernameField: 'email',
// //     passwordField: 'password',
// //     passReqToCallback: true
// // }, function (req, email, password, done) {
// //     User.findOne({'email': email}, function (err, user) {
// //         if (err) {
// //             return done(err);
// //         }
// //         if (!user) {
// //             return done(null, false, {message: 'No user found.'});
// //         }
// //         if (!user.validPassword(password)) {
// //             return done(null, false, {message: 'Wrong password.'});
// //         }
// //         return done(null, user);
// //     });
// // }));

// // */