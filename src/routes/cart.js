const cart = require('express').Router()

//middleware
const {
    addToCart, 
    getCart, 
    buyCart,
    deleteOneCart,
    parseParamsCart,
    parseParamsCartProduct
} = require('../controllers/cart')

const {
    emailExist
} = require('../controllers/user')

//add to cart
cart.post('/add-to-cart/:emailUser/:idProduct', parseParamsCart, parseParamsCartProduct, emailExist, addToCart)
//read
cart.get('/get-cart/:emailUser', parseParamsCart, emailExist, getCart)
//delete product
cart.post('/delete-one/:emailUser/:idProduct', parseParamsCart, parseParamsCartProduct, emailExist, deleteOneCart)
//buyCart
cart.post('/buy-cart/:emailUser', parseParamsCart, emailExist, buyCart)

module.exports = cart