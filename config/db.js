const mongoose= require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try{
        mongoose.connect(db);

        console.log("mongo connected")
    }catch(err){
        console.log(err.message);
        process.exit(1); // ! exits process with failure
    }
}

module.exports = connectDB;