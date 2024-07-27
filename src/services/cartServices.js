const cartConstructor = require('../dao/constructor/cartConstructor')
const cartMongo = new cartConstructor()
const {getProductService} = require('./productServices')
const {transporter} = require('../configuration/config')
const {getProductDTO} = require('../dto/product/productDto')

async function addToCartService(email, product) {
    let prod = await getProductService(product)
    if(prod == 'product-doesnt-exist' || prod == 'invalid-params'){
        return 'product-doesnt-exist'
    }
    await cartMongo.connectoMongo()
    let responsePush = await cartMongo.pushProduct(email, prod[0])
    await cartMongo.disconnectMongo()
    return (
        responsePush == true
        ? 'successfully-added'
        : 'error-while-adding'
    )
}

async function getCartService(email) {
    await cartMongo.connectoMongo()
    let responseCart = await cartMongo.carritoById(email)
    await cartMongo.getCarritos()
    await cartMongo.disconnectMongo()
    let {product} = responseCart
    return (
        product.length !== 0
        ? responseCart
        : 'empty-cart'
    )
}

async function deleteOneService(email, id) {
    await cartMongo.connectoMongo()
    let responseDelete = await cartMongo.deleteProductById(email, id)
    await cartMongo.disconnectMongo()
    return (
        responseDelete == true 
        ? 'successfully-deleted'
        : 'error-while-deleting'
    )
}

async function crearCart(email) {
    await cartMongo.connectoMongo()
    let responseCart = await cartMongo.createCarrito(email)
    await cartMongo.disconnectMongo()
    return responseCart
}

async function buyCartService(email) {
    await cartMongo.connectoMongo()
    let {product} = await cartMongo.buyCart(email)
    await cartMongo.disconnectMongo()
    sendMail(email, parseProducts(product))
    return (
        product !== [] 
        ? 'successfully-buy'
        : 'error-while-buy'
    )
}

function parseProducts(product) {
    const newArProd = []
    for(prod of product){
        newArProd.push(getProductDTO(prod))   
    }
    return newArProd
} 

async function sendMail(email, products) {
    const info = await transporter.sendMail({
        from: 'juan.ignacio.tr@gmail.com',
        to: [email],
        subject: "Resumen de compra",
        text: 'Detalle de compra: ' + '\n' + JSON.stringify(products),
    })
    console.log(info)
}

module.exports = {
    crearCart,
    addToCartService,
    getCartService,
    deleteOneService,
    buyCartService
}