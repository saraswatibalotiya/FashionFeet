
const Customer = require('../../src/models/register')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { check , validationResult } = require('express-validator');

function authController(){

    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/adminDashboard' : '/'
    }
    
    return{
        login(req,res){
            res.render("login");
        },
        
        getAdmin(req,res){
            res.render("adminDashboard");
        },

        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', '***All fields are required***')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    // return res.redirect('/')
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        register(req,res){
            res.render("register");
        },

        async postRegister(req, res) {
            const { name, email,password }   = req.body
            // Validate request 
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
               return res.redirect('/register')
            }

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                errors.array().forEach(err =>{
                    req.flash('error',err.msg)
                })
                // res.render('register',{messages:req.flash()})
                return res.redirect('/register')
            }
            
            // Check if email exists 
            //schemaName . exists (database_wla_email : User_enter_email)=> both are checked
            Customer.exists({ email: email }, (err, result) => {
                if(result) {
                   req.flash('error', 'Email already taken')
                   req.flash('name', name)
                   req.flash('email', email) 
                   return res.render('register')
                }
            })
   
            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10)
            // Create a user 
            const user = new Customer({
                name,
                email,
                password: hashedPassword
            })
   
            user.save().then((user) => {
               // Login 
               req.flash('success','Registration done successfully !')
               return res.redirect('/login')
            }).catch(err => {
               req.flash('error', 'Something went wrong')
                   return res.redirect('/register')
            })
           },

           logout(req, res) {
             req.logout()//passport function 
             return res.redirect('/login')  
           },


        
       
    }
}

module.exports = authController