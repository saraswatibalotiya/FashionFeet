const mongoose = require("mongoose");
const validator = require("validator");
// var bcrypt = require('bcrypt-nodejs');


const customerSchema = new mongoose.Schema({
    name :{type:String,required:true},
    email :{type:String,required:true,unique:true},
    password :{type:String,required:true},
    role:{type:String,default:'customer'}
})


// customerSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// };

// customerSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

// now we need to create a new collections

// const collection_nm = new mongoose.model("collection_nm",Schema_Created_For_Collection);
// module.exports=collection_nm

const Customer = new mongoose.model('Customer',customerSchema);
module.exports=Customer;