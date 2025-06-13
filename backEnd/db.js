const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToMongo = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectToMongo;
