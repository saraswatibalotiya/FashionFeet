const Menproduct = require('../../src/models/menProduct')
var category1;

function productController() {
    return {
        async product(req, res) {
            // console.log(products)
            // console.log(req.query.selectpicker);
            if(req.query.selectpicker == 'men'){
                const products = await Menproduct.find({ category: ['Men'] })
                return res.render('product', { products: products })
            }

            else if(req.query.selectpicker == 'women'){
                const products = await Menproduct.find({ category: ['Womens'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'kids'){
                const products = await Menproduct.find({ category: ['Kids'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'wh'){
                const products = await Menproduct.find({ category: ['Womens Heels'] })
                return res.render('product', { products: products })
            }
            else if(req.query.selectpicker == 'all'){
                const products = await Menproduct.find()
                return res.render('product', { products: products })
            }
            else{
                const products = await Menproduct.find({ category: ['Men'] })
                // const title = 'All'
                return res.render('product', { products: products })
            }


        },

        async categoryProduct(req, res) {
            //     // const { select } = req.body;
            //     var category ;
            //     if (category = document.getElementsByClassName('women')) {

            //         const products = await Menproduct.find({ category: ['Womens'] })
            //         console.log(products)
            //         return res.render('product', { products: products })


        }


        // }
    }
}

module.exports = productController