const {createCartDTO} = require('../dto/cart/cartDto') // aca no lo voy a usar
const {
    addToCartService,
    getCartService,
    deleteOneService,
    buyCartService
} = require('../services/cartServices')

async function addToCart(req, res, next) {
    if(req.emailUserExist) {
        let responseCart = await addToCartService(req.body.email, req.prod) 
        res.json(responseCart)
    } else {   
        res.json('user-doesnt-exist')
    }
}

async function getCart(req, res, next) {
    if(req.emailUserExist) {
        let responseGet = await getCartService(req.body.email)
        res.json(responseGet) 
    } else {   
        res.json('user-doesnt-exist')
    }
}

async function deleteOneCart(req, res, next) {
    if(req.emailUserExist) {
        let responseDeleteOne = await deleteOneService(req.body.email, req.prod)
        res.json(responseDeleteOne)
    } else {   
        res.json('user-doesnt-exist')
    }
}

async function buyCart(req, res, next) {
    if(req.emailUserExist) {
        let responseBuy = await buyCartService(req.body.email)
        res.json(responseBuy)
    } else {
        res.json('user-doesnt-exist')
    }
}

function parseParamsCart(req, res, next) {
    req.body.email = req.params.emailUser  
    next()
}

function parseParamsCartProduct(req, res, next) {
    req.prod = req.params.idProduct
    next()
}

module.exports = {
    addToCart, 
    getCart, 
    deleteOneCart,
    parseParamsCart,
    parseParamsCartProduct,
    buyCart
}