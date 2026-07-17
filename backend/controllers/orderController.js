const Order = require('../models/Order');
const Product = require('../models/Product');

async function getUserOrders(req, res){
    try {
        const orders = await Order.find({user: req.user.id})
            .populate('items.product', 'name price')
            .sort({createdAt: -1});
        res.json(orders);
    } catch(error){
        res.status(500).json({message: 'Errore nel recupero degli ordini', error: error.message})
    }
};

async function getOrderById(req, res){
    try {
        const order = await Order.findById(req.params.id).populate('items.product', 'name price');

        if(!order){
            return res.status(404).json({message: 'Ordine non trovato'});
        }

        if(order.user.toString() !== req.user.id){
            return res.status(403).json({message: 'Forbidden: ordine non tuo'})
        }
        
        res.json(order);
    } catch(error){
        res.status(500).json({message: 'Errore nel recupero del dettaglio ordine', error: error.message});
    }
};

async function createOrder(req, res){
    try {
        const {items} = req.body;
        let totalPrice = 0;
        const orderItems = [];

        for(const item of items){
            const product = await Product.findById(item.productId);

            if(!product){
                return res.status(404).json({message: `Prodotto ${item.productId} non trovato`});
            }

            if(product.stock < item.quantity){
                return res.status(400).json({message: `Stock insufficiente per ${product.name}`});
            }

            totalPrice += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                priceAtOrder: product.price
            });

            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
                user: req.user.id,
                items: orderItems,
                totalPrice
        });

        res.status(201).json(order)

    } catch(error){
        res.status(500).json({message: 'Errore nella creazione dell\'ordine', error: error.message});
    }
}

module.exports = {
    getUserOrders,
    getOrderById,
    createOrder
}