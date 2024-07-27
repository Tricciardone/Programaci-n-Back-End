// Importar servicios relacionados con el carrito
const {
    addToCartService,
    getCartService,
    deleteOneService,
    buyCartService
} = require('../services/cartServices');

// Función para añadir al carrito
async function addToCart(req, res, next) {
    if (req.emailUserExist) {
        let responseCart = await addToCartService(req.body.email, req.prod);
        res.json(responseCart);
    } else {
        res.json('user-doesnt-exist');
    }
}

// Función para obtener el carrito
async function getCart(req, res, next) {
    if (req.emailUserExist) {
        let responseGet = await getCartService(req.body.email);
        res.json(responseGet);
    } else {
        res.json('user-doesnt-exist');
    }
}

// Función para eliminar un producto del carrito
async function deleteOneCart(req, res, next) {
    if (req.emailUserExist) {
        let responseDeleteOne = await deleteOneService(req.body.email, req.prod);
        res.json(responseDeleteOne);
    } else {
        res.json('user-doesnt-exist');
    }
}

// Función para comprar el carrito
async function buyCart(req, res, next) {
    if (req.emailUserExist) {
        let responseBuy = await buyCartService(req.body.email);
        res.json(responseBuy);
    } else {
        res.json('user-doesnt-exist');
    }
}

// Middleware para parsear parámetros de carrito
function parseParamsCart(req, res, next) {
    req.body.email = req.params.emailUser;
    next();
}

// Middleware para parsear parámetros de producto
function parseParamsCartProduct(req, res, next) {
    req.prod = req.params.idProduct;
    next();
}

// Exportar las funciones y middlewares
module.exports = {
    addToCart,
    getCart,
    deleteOneCart,
    parseParamsCart,
    parseParamsCartProduct,
    buyCart
};
