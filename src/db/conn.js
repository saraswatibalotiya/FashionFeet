const mongoose = require("mongoose");


// create a database

mongoose.connect("mongodb://localhost:27017/fashionfeet",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:true
}).then(()=>{
    console.log("connection succesful")
}).catch((error)=>{
    console.log(error);
})


//mongoose give promise to secure connection and make database 