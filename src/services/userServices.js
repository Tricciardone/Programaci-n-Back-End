const bcrypt = require('bcrypt')
const saltRounds = 10
const userConstructor = require('../dao/constructor/userConstructor')
const userMongo = new userConstructor()
const {getUserDTO} = require('../dto/user/userDto')
const { crearCart } = require('../services/cartServices')
const {transporter} = require('../configuration/config')

async function signUpService({email, user, pass, number, photo, admin}) {
    await userMongo.connectoMongo()
    let hash = bcrypt.hashSync(pass, saltRounds)
    let userCrypt = {
        user: user,
        email: email,
        pass: hash,
        number: number,
        photo: photo,
        admin: admin
    }
    let responseNewUser = await userMongo.newUser(userCrypt)
    await userMongo.disconnectMongo()
    await crearCart(email)
    await sendMail(email)
    return (
    responseNewUser == true
        ? true
        : false
    )
}

async function sendMail(email) {
    const info = await transporter.sendMail({
        from: 'juan.ignacio.tr@gmail.com',
        to: ['juan.ignacio.tr@gmail.com'],
        subject: "Registro de usuario",
        text: 'usuario nuevo' + email + ' ' + Date.now(),
    })
}

async function loginService({email, pass}) {
    await userMongo.connectoMongo()
    let userCompare = await userMongo.getUser(email)
    return (
        bcrypt.compareSync(pass, userCompare.pass) 
        ? true
        : false
    )
}

async function getUserService(email) {
    await userMongo.connectoMongo()
    let responseUser = await userMongo.getUser(email)
    await userMongo.disconnectMongo()
    return getUserDTO(responseUser)
}

async function emailExistService(email) {
    await userMongo.connectoMongo()
    let response = await userMongo.findUser(email)
    await userMongo.disconnectMongo()
    return response
}

module.exports = {
    signUpService,
    loginService,
    getUserService,
    emailExistService
}