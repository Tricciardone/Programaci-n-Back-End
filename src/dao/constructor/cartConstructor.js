const mongoose = require('mongoose')
const { update } = require('../models/cartModel')
//model cart
const modelCart = require('../models/cartModel')
//mongo connect // .env
const connectMongo = process.env.CARTMONGO

class mongoCart {
    constructor() {
        this.model = modelCart
        this.connection = connectMongo
    }

    async connectoMongo() {
        try {
            await mongoose.connect(this.connection)
        } catch(err) {
            console.log('error connect mongo cart ' + err)
        }
    }

    async disconnectMongo() {
        try {
            await mongoose.disconnect()
        } catch(err) {
            console.log('error al desconectar mongo User ' + err)
        }
    }

    async getLast() {
        try {
            let last = await this.model.findOne().sort({id:-1}).limit(1)
            if(last == undefined) {
                let lastId = 0
                return lastId
            }
            let lastId = last.id
            return lastId
        } catch(err) {
            console.log('error in find last ' + err)
        }
    } //devuelve el ultimo id

    async getCarritos() {
        try {
            let data = await this.model.find();
            return data;
        } catch(err) {
            console.log("error find() " + err);
        }
    } // devuelve todos los carritos ??? nose para que 

    async carritoById(email) {
        try {
            let data = await this.model.findOne({email:email});
            return data
        } catch(err) {
            console.log("error find()" + err);
        }
    } // devuelve un carrito en especial con el mail del usuario

    async createCarrito(email) {
        try {
            let newId = await this.getLast();
            let carritoNew = new this.model({
                id: newId + 1,
                email: email,
                product: []
            });
            await carritoNew.save();
            return true
        } catch(err) {
            console.log("error create() " + err);
        }
    } // crea un carrito para un usuario

    async deleteCarritoById(email) {
        try {
            await this.model.deleteOne({email: email})
        } catch(err) {
            console.log("error al eliminar " + err);
        }
    } //elimna un carrito // solo en el caso de que el usuario se de de baja

    async pushProduct(email, obj) {
        try {
            await this.model.updateOne({email: email}, {$push: {product: obj}});
            return true
        } catch(err) {
            console.log("error al agregar " + err);
        }
    } // agrega un producto al carrito

    async deleteProductById(email, idProd) {
        try {
            const {product} = await this.carritoById(email)
            const updateProducts = product.filter((item) => item.id !== parseInt(idProd))
            let responseupdate = await this.model.updateOne({email: email}, {product: updateProducts});
            return true
        } catch(err) {
            console.log("error al eliminar " + err);
        }
    } //elimina un producto del carrito //ARREGLAR

    async buyCart(email) {
        try {
            let productEmpty = []
            let responseBuy = await this.model.findOneAndUpdate({email: email},{product: productEmpty})
            return responseBuy
        } catch(err) {
            console.log('error buying ' + err)
        }
    }
} 

module.exports = mongoCart