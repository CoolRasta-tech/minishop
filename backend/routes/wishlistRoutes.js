const express = require('express');
const protect = require('../middlewares/auth');
const wishlistController = require('../controllers/wishlistController');
const router = express.Router();

router.get("/", protect, wishlistController.getWishList);
router.post("/:id", protect, wishlistController.addToWishlist);
router.delete("/:id", protect, wishlistController.removeFromWishlist);

module.exports = router;