const {newUserDTO, userLoginDTO} = require('../dto/user/userDto')
const {
    signUpService, 
    loginService, 
    getUserService,
    emailExistService
} = require('../services/userServices')

async function signUp(req, res, next) {
    console.log(req.emailUserExist + ' sign email exist')
    if (!req.emailUserExist) {
        let userDtoNew = newUserDTO(req.body)
        await signUpService(userDtoNew)
        ? next()
        : res.json('pass-wrong')
    } else {
        res.json('email-exist')
    }
}

async function logIn(req, res, next) {
    if (req.emailUserExist) {
        let userDtoLogin = userLoginDTO(req.body)
        await loginService(userDtoLogin)
        ? next()
        : res.json('pass-not-match')
    } else {
        res.json('email-doesnt-exist')
    }
}

function logOut(req, res, next) {
    req.session.destroy( err => {
        if (err) {
          res.json({error: 'olvidar', descripcion: err})
        } else {
            res.redirect('/')
        }
    })
    // res.json('no-session-active')
}

async function getUser(req, res, next) {
    if (req.emailUserExist) {
        let reponseUser = await getUserService(req.params.email)
        res.json(reponseUser)
    } else {
        res.json('user-doesnt-exist')
    }
}

//middlewares
function parseParam(req, res, next) {
    req.body.email = req.params.email
    next()
}

async function emailExist(req, res, next) {
    req.emailUserExist = await emailExistService(req.body.email)
    next()
}

function createSession(req, res, next) {
    if(!req.session.email) {
        req.session.email = req.body.email
        res.json('cree session')
    }
}

function getSession(req, res, next) {
    if(req.session.email) {
        res.json('session iniciada ' + req.session.email)
    } else {
        res.json('no-active-session')
    }
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.json('session-actived')
    }
}

module.exports = {
    signUp,
    logIn,
    logOut,
    getUser,
    emailExist,
    createSession,
    isAuth,
    parseParam,
    getSession
}