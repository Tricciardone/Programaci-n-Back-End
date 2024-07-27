const mainRouters = require('express').Router()
const cart = require('./cart')
const users = require('./user')
const product = require('./product')

mainRouters.use('/users', users)
mainRouters.use('/cart', cart)
mainRouters.use('/product', product)

module.exports = mainRouters