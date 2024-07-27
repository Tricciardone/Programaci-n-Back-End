const mongoose = require('mongoose');

const productoCollection = 'product';
const productSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true, index: true},
    title: {type: String, required: true, max: 200},
    desc: {type: String, required: true, max: 200},
    thumbnail: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    tags: {type: Object, require: true}
});
const product = mongoose.model(productoCollection, productSchema);
module.exports = product