
const Cart = require("../../src/models/cart")

function cartController() {

    return {
        cart(req, res) {
            // res.render("cart");
            carts = new Cart(cart);
            items = carts.generateArray();
            if (items.qty > 5) {
                req.flash('error', "You cannot order product with more than 5 qty")
            }
            res.render('cart');

            

            // Order.find(function (err, orders) {
            //     if (err) {
            //         return res.write('Error!');
            //     }
            //     var carts;
            //     orders.forEach(function (order) {
            //         carts = new Cart(order.cart);
            //         order.items = carts.generateArray();
            //     })
               
            // })

        },
        update(req, res) {
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }
            // for the first time creating cart and adding basic object structure
            // if (!req.session.cart) {
            //     req.session.cart = {
            //         items: {},
            //         // totalQty: 0,
            //         // totalPrice: 0
            //     }
            // }
            // let cart = req.session.cart
            // console.log(req.body)

            return res.JSON({ data: "all ok" });

            // Check if item does not exist in cart 
            // if(!cart.items[req.body._id]) {
            //     cart.items[req.body._id] = {
            //         item: req.body,
            //         qty: 1
            //     }
            //     cart.totalQty = cart.totalQty + 1
            //     cart.totalPrice = cart.totalPrice + req.body.price
            // } else {
            //     cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
            //     cart.totalQty = cart.totalQty + 1
            //     cart.totalPrice =  cart.totalPrice + req.body.price
            // }
            // return res.json({ totalQty: req.session.cart.totalQty })
        }


    }
}

module.exports = cartController