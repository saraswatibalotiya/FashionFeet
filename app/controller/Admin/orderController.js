const Order = require("../../../src/models/order")

const Cart = require("../../../src/models/cart")
// const Order = require('../../../models/order')

function orderController() {
    return {
        index(req, res, next) {
            //-------------------------------------
            //$ne = not equal to ,
            //     //here .populate is used to fetch the user data from the customer id which is stored in the order table
            //     // -password means we dont want password field baki sb data chaiye
            //     //exec(err,results) it is a function
            //     //.populate('field we want to populate','field we dont want')

            //---------------------------
            // Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).
            //     populate('customerId').
            //     exec(function(err,orders){
            //         if(err) return handleError(err);
            //         console.log(orders.customerId.name);

            //     })

            /// vimp populate ----------------------------------------------------------------
            // orders = await Order.find().populate('customerId');
            // return res.render('adminOrders',{orders:orders});
            //---------------------------------------------------------------------------------

            Order.find({ sort: { 'createdAt': -1 } }, function (err, orders) {
                if (err) {
                    return res.write('Error!');
                }
                var carts;
                orders.forEach(function (order) {
                    carts = new Cart(order.cart);
                    order.items = carts.generateArray();
                })
                res.render('adminOrders', { orders: orders });
            }).populate('customerId');
        },

        // changeStatus(req, res) {
        // },

        updateStatus(req, res) {
            Order.updateOne({ _id: req.body.oid }, { status: req.body.status }, (err, data) => {
                if (!err) {
                    res.redirect('/adminOrders');
                }
                else {
                    console.log('error' + err);
                }
            });
        },
    }
}

module.exports = orderController