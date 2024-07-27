const user = require('express').Router()
const session = require('express-session')
const MongoStore = require('connect-mongo')
//middleware
const {
    signUp, 
    logIn,  
    getUser,
    emailExist,
    createSession,
    logOut,
    parseParam,
    getSession
} = require('../controllers/user')

//session start
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
user.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.SESSIONMONGO,
            mongoOptions: advancedOptions,
            ttl: 1000,
        }),
        
        secret: 'obiwankenobi',
        resave: false,
        saveUninitialized: false,
    })
)
//session end
user.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.email) {
            return true
        }
        return false
    }
    req.logout = done => {
        req.session.destroy(done)
    }
    next()
})

//sign up
user.post('/sign-up', emailExist, signUp, createSession)
//log in
user.post('/log-in', emailExist, logIn, createSession)
//log out
user.post('/log-out', emailExist, logOut)
//get user
user.get('/get-user/:email', parseParam, emailExist, getUser)
//session start
user.get('/session-use', getSession)

module.exports = user