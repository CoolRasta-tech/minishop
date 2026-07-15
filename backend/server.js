require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
    res.status(404).json({message: 'Route non trovata'});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta: ${PORT}`);
});