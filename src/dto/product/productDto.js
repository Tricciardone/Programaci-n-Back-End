class newProduct {
    constructor({title, desc, thumbnail, price, stock, tags}) {
        this.title = title
        this.desc = desc
        this.thumbnail = thumbnail
        this.price = price
        this.stock = stock
        this.tags = tags
    }
}

class getProduct {
    constructor({title, desc, thumbnail, price, stock, tags}) {
        this.title = title
        this.desc = desc
        this.thumbnail = thumbnail
        this.price = price
        this.stock = stock
        this.tags = tags
    }
}

function createNewProductDTO(productInfo) {
    return new newProduct(productInfo)
}

function getProductDTO(productInfo) {
    return new getProduct(productInfo)
}

module.exports = {
    createNewProductDTO,
    getProductDTO
}