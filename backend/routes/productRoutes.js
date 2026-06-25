const express = require('express');
const productController = require('../controllers/productController');
const protect = require('../middlewares/auth');
const adminOnly = require('../middlewares/isAdmin');
const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, adminOnly, productController.createProduct);
router.put("/:id", protect, adminOnly, productController.updateProduct);
router.delete("/:id", protect, adminOnly, productController.deleteProduct);

module.exports = router;