class user {
    constructor({email, user, number, photo}) {
        this.user = user
        this.email = email
        this.number = number 
        this.photo = photo 
    }
}

class newUser {
    constructor({email, user, pass, number, photo, admin}) {
        this.user = user
        this.email = email
        this.pass = pass
        this.number = number
        this.photo = photo
        this.admin = admin
    }
}

class userLogin {
    constructor({email, pass}) {
        this.email = email
        this.pass = pass
    }
}

function newUserDTO(userInfo) {
    return new newUser(userInfo)
}

function getUserDTO(userInfo) {
    return new user(userInfo)
}

function userLoginDTO(userInfo) {
    return new userLogin(userInfo)
}

module.exports = {
    newUserDTO, 
    getUserDTO, 
    userLoginDTO
}