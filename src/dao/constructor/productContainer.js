const mongoose = require('mongoose')
//model user
const modelProduct = require('../models/productModel')
//mongo connect //la traigo de .env
const connectMongo = process.env.PRODMONGO

class mongoProduct {
    constructor() {
        this.model = modelProduct
        this.connection = connectMongo
    }

    async connectoMongo() {
        try {
            await mongoose.connect(this.connection)
        } catch(err) {
            console.log('error connect mongo User ' + err)
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
            console.log('error getlast product ' + err)
        }
    } //devuelve el ultimo id/producto

    async getAll() {
        try {
            let products = await this.model.find()
            return products
        } catch(err) {
            console.log('error getAll ' + err)
        }
    } //devuelve todos los produsctos

    async newProd(productInfo) {
        try {
            let newId = await this.getLast()
            let newPrd = new this.model({
                id: newId + 1,
                title: productInfo.title,
                desc: productInfo.desc,
                thumbnail: productInfo.thumbnail,
                price: productInfo.price,
                stock: productInfo.stock,
                tags: {
                    color1: productInfo.tags.color1,
                    color2: productInfo.tags.color2,
                    keyWord: productInfo.tags.keyWord
                }
            })
            await newPrd.save()
            return true
        } catch(err) {
            console.log('error en newProd ' + err)
        }
    } //guarda un nuevo producto en la base

    async deleteById(id) {
        try {
            await this.model.deleteOne({id: id})
        } catch(err) {
            console.log('error en deletebyid ' + err);
        }
    } //elimina un producto en especifico

    async getById(id) {
        try {
            let userById = await this.model.find({id: id})
            return userById
        } catch(err) {
            console.log('error en getbyid ' + err)
        }
    } //devuelve un producto en especifico
}

module.exports = mongoProduct