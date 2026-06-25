const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middlewares/auth');
const router = express.Router();

router.get("/", protect, orderController.getUserOrders);
router.get("/:id", protect, orderController.getOrderById);
router.post("/", protect, orderController.createOrder);

module.exports = router;