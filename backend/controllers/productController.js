const Product = require('../models/Product');

async function getProducts(req, res){
    try {
        const {category, search, sort, genre} = req.query;
        let filter = {};

        if(category) filter.category = category;

        if(search) filter.name = {$regex: search, $options: 'i'};

        if(genre) filter.genre = genre;

        let query = Product.find(filter);

        if(sort === "name"){
            query = query.sort({name: 1});
        } else if(sort === "price"){
            query = query.sort({price: -1});
        } else if(sort === "stock"){
            query = query.sort({stock: -1});
        } else {
            query = query.sort({createdAt: -1})
        }

        const products = await query;
        res.json(products);
    } catch(error){
        res.status(500).json({message: 'Errore nel recupero della lista prodotti', error: error.message})
    }
};

async function getProductById(req, res){
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Prodotto non trovato'});
        }

        res.json(product)
    } catch(error){
        res.status(500).json({message: 'Errore nel recupero del prodotto', error: error.message})
    }
};

async function createProduct(req, res){
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(error){
        res.status(500).json({message: 'Errore nella creazione del prodotto', error: error.message});
    }
};

async function updateProduct(req, res){
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Prodotto non trovato'});
        }
        
        const allowedFields = ['price', 'stock']

        allowedFields.forEach(field => {
            if(req.body[field] !== undefined){
                product[field] = req.body[field];
            }
        });

        await product.save();
        res.json(product);
    } catch(error){
        res.status(500).json({message: 'Errore nell\'aggiornamento del prodotto', error: error.message});
    }
};

async function deleteProduct(req, res){
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: 'prodotto non trovato'});
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({message: 'Prodotto eliminato'});
    } catch(error){
        res.status(500).json({message: 'Errore nell\' eliminazione del prodotto', error: error.message});
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}