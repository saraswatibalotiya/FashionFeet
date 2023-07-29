const axios = require('axios');
const MenProduct = require('../../../src/models/menProduct')
var ObjectId = require('mongodb').ObjectId
const Order = require("../../../src/models/order")
const Cart = require("../../../src/models/cart")

const { check, validationResult } = require('express-validator');


function adminController() {
    return {
        // TO FIND SPECIFIC CATEGORY
        // MenProduct.find({name:['NIKE RED SPORTS SHOES FOR MEN']},function (err, product) {
        //     res.render('admin', { products: product });
        // });
        getProduct(req, res) {
            MenProduct.find(function (err, product) {
                res.render('admin', { products: product });
            });
        },

        //GET ADD PRODUCT PAGE FOR ADMIN
        addProduct(req, res) {
            res.render('add-product')
        },

        //POST PRODUCT PAGE FOR ADMIN
        async postProduct(req, res) {
            const { name, image, price, category, stock } = req.body
            // Validate request 
            if (!name || !image || !price || !category) {
                req.flash('error', '***All fields are required***')
                req.flash('name', name)
                req.flash('price', price)
                req.flash('category', category)
                req.flash('stock', stock)
                return res.redirect('/add-product')
            }

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(err => {
                    req.flash('error', err.msg)
                })
                // res.render('register',{messages:req.flash()})
                return res.redirect('/add-product')
            }

            // Check if email exists 
            //schemaName . exists (database_wla_email : User_enter_email)=> both are checked
            MenProduct.exists({ name: name }, (err, result) => {
                if (result) {
                    req.flash('error', 'Product Already Present')
                    return res.redirect('add-product')
                }
                else{
                    const product = new MenProduct({
                        name,
                        image,
                        category,
                        price,
                        stock
                    })
                    product.save().then((product) => {
                        req.flash('success', 'Product Added Successfully');
                        return res.redirect('/admin')
                    }).catch(err => {
                        req.flash('error', 'Something went wrong')
                        return res.redirect('/add-product')
                    })
                }
            })


            
        },

        // VIEW UPDATE PAGE OF PRODUCT FOR ADMIN
        viewProduct(req, res) {
            MenProduct.findById(req.params.id, (err, doc) => {
                if (!err) {
                    res.render("update-product", {
                        // viewTitle: "Update Product",
                        products: doc
                    });
                }
            })
        },

        // POST UPDATE PAGE FOR ADMIN IN UPDATE PAGE
        updateProduct(req, res) {
            MenProduct.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
                if (!err) {
                    req.flash('success', 'Product Updated Successfully');
                    res.redirect('/admin');
                }
                else {
                    console.log('error' + err);
                }
            });
        },

        // DELETE PRODUCT IN ADMIN PAGE
        deleteProduct(req, res) {
            MenProduct.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    // return res.write('Error!');
                    req.flash('success', 'Product Deleted Successfully');
                    res.redirect('/admin')
                }
                // Order.findById(req.params.id, function (err, orders) {
                //     if (err) {
                //         return res.write('Error!');
                //     }
                //     var carts;
                //     orders.forEach(function (order) {
                //         carts = new Cart(order.cart);
                //         order.items = carts.generateArray();
                //     })
                //     res.render('admin', { orders: orders });
                // })
                // Order.findById(req.params.id,function(err, orders){
                //     if (err) {
                //         return res.write('Error!');
                //     }
                //     var carts;
                //     orders.forEach(function (order) {
                //         carts = new Cart(order.cart);
                //         order.items = carts.generateArray();
                //     })
                //     res.render('admin', { orders: orders });
                // })
                else { console.log('Error in employee delete :' + err); }
            });

        }







    }
}

module.exports = adminController