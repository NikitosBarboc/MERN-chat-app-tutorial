const  mongoose =  require("mongoose");
const { model } =  require("mongoose");
const { port, mongoUri } = require("./default.json")
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(mongoUri)
    console.log(`MongoBD Connected: ${connect.connection.host}`.cyan.underline);
  } catch(e) {
    console.log(`Error: ${e}`.red.bold);
    process.exit(1);
  }
}

module.exports = connectDB;
