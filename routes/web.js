
const authController = require("../app/controller/authController");
const productController = require("../app/controller/productController");

const contactController = require("../app/controller/contactController");

const cartController = require("../app/controller/cartController");
//for customer
const orderController = require("../app/controller/orderController");
//for admin
const AdminOrderController = require("../app/controller/Admin/orderController");
const AdminProductController = require("../app/controller/Admin/productController");
const AdminContactController = require("../app/controller/Admin/contactController");
var Product = require('../src/models/menProduct');
var Cart = require('../src/models/cart');

const { check, validationResult } = require('express-validator');

// const Menproduct = require('../../src/models/menProduct')

// var csrfProtection = csrf();

function initRoute(app) {

    //app.get(path,callback)
    //Another way 
    /*-----------------
    app.get("/", (req, res) => {
        res.render("index");
    })
    ---------------------*/

    app.get("/login", authController().login)

    app.post('/login', authController().postLogin)

    app.get("/register", authController().register)

    app.post("/register", [
        check('email').isEmail().withMessage('Type Valid Email \n'),

        check('password').isLength({ min: 4 }).withMessage('Password must be atleast 4 character long \n '),

        check('name').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic. \n ')
            .isLength({ min: 3 }).withMessage(' Name must be atleast 3 character long \n'),

    ], authController().postRegister)

    app.post("/", [
        [
            check('email').isEmail().withMessage('Type Valid Email \n'),

            check('queries').isLength({ min: 5 }).withMessage('Message must be atleast 5 character long \n '),

            check('address').isLength({ min: 5 }).withMessage('Address must be atleast 5 character long \n '),

            check('name').matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic. \n ')
                .isLength({ min: 3 }).withMessage(' Name must be atleast 3 character long \n'),


        ]
    ], contactController().postContact)
    // app.get("/",contactController().getContact)

    //getting about page
    app.get("/about", (req, res) => {
        res.render('about')
    })

    app.get("/contact", (req, res) => {
        res.render('contact')
    })






    //getting product in user page
    app.get("/product", productController().product)

    app.get("/product", productController().categoryProduct)

    app.post("/logout", authController().logout)

    //posting user orders
    app.post("/orders", [
        check('mobile_no').isNumeric().withMessage('Mobile No Should Be Numeric')
            .isLength({ min: 10 }).withMessage('Mobile No must be atleast 10 character long \n '),

        check('address').isLength({ min: 5 }).withMessage(' Address must be atleast 5 character long \n'),

    ], orderController().store)

    //getting order details for user
    app.get("/allOrder", orderController().index)

    //-------------------------------------------------ADMIN ROUTES----------------------------------------------------
    app.get('/adminOrders', AdminOrderController().index)

    app.get('/adminContact', AdminContactController().index)

    app.post('/adminOrders', AdminOrderController().updateStatus)

    app.get('/admin', AdminProductController().getProduct)

    app.get('/adminDashboard', authController().getAdmin)

    app.get('/add-product',AdminProductController().addProduct)
    //add product
    app.post('/add-product',
    [
        check('price').isNumeric().withMessage('**Price Should Be Numeric Only ** \n'),

        check('stock').isNumeric().withMessage('** Stock Should Be Numeric Only **  \n'),

        check('name').matches(/^[A-Za-z\s]+$/).withMessage('** Name must be alphabetic**  \n ')
            .isLength({ min: 3 }).withMessage(' Name must be atleast 3 character long \n'),

        check('category').matches(/^[A-Za-z\s]+$/).withMessage('** Name must be alphabetic.**  \n ')
            .isLength({ min: 3 }).withMessage(' ** Category must be atleast 3 character long **  \n'),

    ], AdminProductController().postProduct)

    //update product
    app.get('/update-product/:id', AdminProductController().viewProduct)//view product on clik
    app.post('/update-product/:id',
    [
        check('price').isNumeric().withMessage('**Price Should Be Numeric Only ** \n'),

        check('stock').isNumeric().withMessage('** Stock Should Be Numeric Only **  \n'),

        check('name').matches(/^[A-Za-z\s]+$/).withMessage('** Name must be alphabetic**  \n ')
            .isLength({ min: 3 }).withMessage(' Name must be atleast 3 character long \n'),

        check('category').matches(/^[A-Za-z\s]+$/).withMessage('** Name must be alphabetic.**  \n ')
            .isLength({ min: 3 }).withMessage(' ** Category must be atleast 3 character long **  \n'),

    ]
    , AdminProductController().updateProduct) // update product on clik

    //delete product
    app.get('/admin/delete/:id', AdminProductController().deleteProduct) // delete product on clik

}

module.exports = initRoute;