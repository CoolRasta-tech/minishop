const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.listen(process.env.URI, () => {
    console.log(`Server in ascolto sulla porta: ${process.env.PORT}`);
});