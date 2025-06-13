const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(process.env.MONGODB_URI, () => {
    // console.log("connection successfully");
  });
};

module.exports = connectToMongo;
