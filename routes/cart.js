var express = require('express');
var router = express.Router();

var Product = require('../src/models/menProduct');
var Cart = require('../src/models/cart');

router.get("/", (req, res) => {
    res.render("index");
})

router.get('/profile', (req, res, next) => {
    res.render("/profile")
})

// ============================================================== CART ==================================================================
router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/product');
    });
});

router.get('/cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render("cart", { product: null });
    }
    var cart = new Cart(req.session.cart);
    res.render("cart", { product: cart.generateArray(), totalPrice: cart.totalPrice ,totalQty: cart.totalQty});
   
});

router.get('/remove/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/reduce/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});


router.get('/increase/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increaseByOne(productId);
    req.session.cart = cart;
    console.log(cart.items[productId].qty);

    if (cart.items[productId].qty > 5) {
        req.flash('errorCart', "***You cannot order product with more than 5 qty***")
        cart.reduceByOne(productId);
    }

    if (cart.items[productId].qty > cart.items[productId].item.stock) {
        req.flash('errorCart', "***Out Of Stock***")
        cart.reduceByOne(productId);
    }
    
    // Product.findById(productId, function (err, product) {
    //     if (err) {
    //         return res.redirect('/');
    //     }
    //     if (cart.items[productId].qty > product.stock) {
    //         req.flash('error', "***Out Of Stock***")
    //         cart.reduceByOne(productId);
    //     }
    //     res.redirect('/cart');
    // });
   


    res.redirect('/cart');
});


module.exports = router;