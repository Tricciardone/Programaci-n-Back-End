class newCart {
    constructor({email}) {
        this.email = email
        this.product = []
    }
}

function createCartDTO({email}) {
    return new newCart(email)
}

module.exports = createCartDTO