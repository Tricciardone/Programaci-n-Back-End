const product = require('express').Router()

//middleware
const {
    createProduct, 
    updateProduct, 
    getProduct, 
    parseParamProd,
    productExist
} = require('../controllers/product')

//create product
product.post('/create-product', createProduct)
//update product
product.post('/update-product', productExist, updateProduct)
//getProduct
product.get('/get-product/:id', parseParamProd, getProduct)

module.exports = product