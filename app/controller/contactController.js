
const User = require('../../src/models/contact')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { check , validationResult } = require('express-validator');

function contactController(){
    return{
        async postContact(req, res) {
            const { name, email,address,queries }   = req.body
            // Validate request 
            if(!name || !email || !address || !queries) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
               return res.redirect('/#contact')
            }

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                errors.array().forEach(err =>{
                    req.flash('error',err.msg)
                })
                // res.render('register',{messages:req.flash()})
                return res.redirect('/#contact')
            }
            
            // Check if email exists 
            //schemaName . exists (database_wla_email : User_enter_email)=> both are checked
            // Create a user 
            const user = new User({
                name,
                email,
                address,
                queries
            })
   
            user.save().then((user) => {
               // success mssg
               req.flash('success','Your Message has been Sent !')
               return res.redirect('/#contact')
               
            }).catch(err => {
               req.flash('error', 'Something went wrong')
                   return res.redirect('/#contact')
            })
           },


    }
}

module.exports = contactController