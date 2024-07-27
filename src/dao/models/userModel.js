const mongoose = require('mongoose')

const userCollection = 'user'
const userSchema = new mongoose.Schema({
    id: {type: Number, require: true, unique: true},
    user: {type: String, require: true, max: 50},
    email: {type: String, require: true, max: 150},
    pass: {type: String, require: true},
    number: {type: Number, require: true},
    photo: {type: String, require: false},
    admin: {type: Boolean, require: true}
})

const mongoUser = mongoose.model(userCollection, userSchema)
module.exports = mongoUser