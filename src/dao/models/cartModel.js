const mongoose = require('mongoose');

const carritoCollection = 'cart';
const cartSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true, index: true},
    email: {type: String, required: true},
    product: {type: Array, required: true}
})
const cart = mongoose.model(carritoCollection, cartSchema); 
module.exports = cart