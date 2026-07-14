const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI);
        console.log(`MongoDB connesso: ${conn.connection.host}, {DB: ${conn.connection.name}}`);
    } catch(error){
        console.log("Errore:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;