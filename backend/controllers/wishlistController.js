const User = require('../models/User');
const Product = require('../models/Product');

async function getWishList(req, res){
    try {
        const user = await User.findById(req.user.id).populate('wishlist', 'name price description imageUrl');

        if(!user){
            return res.status(404).json({message: 'Utente non trovato'});
        }

        res.json(user.wishlist);
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
};

async function addToWishlist(req, res){
    try {
        const user = await User.findById(req.user.id);
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Prodotto non trovato'});
        }

        if(user.wishlist.map(id => id.toString()).includes(req.params.id)){
            return res.status(400).json({message: 'Forbidden: prodotto già contenuto'});
        }

        await User.findByIdAndUpdate(
            req.user.id,
            {$addToSet: {wishlist: product._id}}
        )
        res.json({message: 'Prodotto aggiunto alla WishList'});
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
};

async function removeFromWishlist(req, res){
    try {
        const user = await User.findById(req.user.id);
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Prodotto non trovato'});
        }

        if(!user.wishlist.map(id => id.toString()).includes(req.params.id)){
            return res.status(400).json({message: 'Prodotto non contenuto nella Wishlist'});
        }

        await User.findByIdAndUpdate(
            req.user.id,
            {$pull: {wishlist: product._id}}
        )
        res.json({message: 'Prodotto rimosso dalla Wishlist'});
    } catch(error){
        res.status(500).json({message: "Internal Server Error"})
    }
};

module.exports = {
    getWishList,
    addToWishlist,
    removeFromWishlist
}