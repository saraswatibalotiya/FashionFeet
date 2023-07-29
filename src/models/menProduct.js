const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{ type:String , required:true},
    image:{ type:String , required:true},
    price:{ type:Number , required:true},
    category:{type:String,required:true},
    stock:{type:Number,required:true},
    size:{type:Array,required:true}
})


const Product = new mongoose.model('Product',ProductSchema);
module.exports=Product;