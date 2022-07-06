const mongoose = require('mongoose');

const connectToMongo = () =>{
    mongoose.connect('mongodb://localhost:27017/Free-Notes' , ()=>{
        console.log("connection successfully");
    })
}

module.exports = connectToMongo;