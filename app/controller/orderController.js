const Order = require('../../src/models/order')
const Cart = require('../../src/models/cart')
const { check , validationResult } = require('express-validator');


function orderController() {
    return {
        store(req,res){

            // Validate request
            const { mobile_no, address,  } = req.body
            if(!mobile_no || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart#orderDetails')
            }
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                errors.array().forEach(err =>{
                    req.flash('error',err.msg)
                })
                // res.render('register',{messages:req.flash()})
                return res.redirect('/cart#orderDetails')
            }

            const order = new Order({
                customerId: req.user._id,
                cart: req.session.cart,
                mobile_no,
                address,
            })
            order.save().then(result => {
                req.flash('success','Order Placed Successfully');
                delete req.session.cart ;
                return res.redirect('/allOrder')
            }).catch(err =>{
                req.flash('error','Something went Wrong')
                return res.redirect('/cart')
            });


        },

        async index(req, res) {
            Order.find({ customerId: req.user._id },null,{ sort: { 'createdAt': -1 } },
            function(err,orders){
                if(err){
                    return res.write('Error!');
                }
                var carts;
                orders.forEach(function(order){
                    carts = new Cart(order.cart);
                    order.items = carts.generateArray();
                })
                res.render('allOrder',{ orders:orders });
            })
        },

    }

}

module.exports = orderController