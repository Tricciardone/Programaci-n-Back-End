const {createNewProductDTO, getProductDTO} = require('../dto/product/productDto')
const {
    createProductService,
    updateProductService,
    getProductService,
    productExistService
} = require('../services/productServices')

async function createProduct(req, res, next) {
    let productDtoNew = createNewProductDTO(req.body)
    await createProductService(productDtoNew) 
    ? res.json('product-created')
    : res.json('something-wrong-creating-product')
}

function updateProduct(req, res, next) {

}

async function getProduct(req, res, next) {
    let prodId = req.params.id ? req.params.id : 0
    res.json(await getProductService(prodId))
}

async function parseParamProd(req, res, next) {
    req.body.id = req.params.id
    next()
}

async function productExist(req, res, next) {
    req.productExist = await productExistService(req.body.id)
    next()
}

module.exports = {
    createProduct, 
    updateProduct, 
    getProduct, 
    parseParamProd,
    productExist
}