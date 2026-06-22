const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'il prezzo deve essere maggiore di zero']
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Maglie", "Pantaloni", "Felpe", "Cappelli", "Giubotti", "Pantaloncini"]
    },
    stock: {
        type: Number,
        default: 0
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);

