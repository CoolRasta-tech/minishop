require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use((req, res) => {
    res.status(404).json({message: 'Route non trovata'});
})

app.listen(process.env.PORT, () => {
    console.log(`Server in ascolto sulla porta: ${process.env.PORT}`);
})