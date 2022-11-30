//import User from "../models/User"

function isLoggedIn(req, res, next) {

    if (req.token && req.token.id) {
        next()
    } else {
        res.sendStatus(401)
    }
    // has token
    // token contains user id
    // token is not expired
}

function isPaidAccount(req, res, next) {
    // the user id is a real / existing account
    // const user = await User.findById(req.body.UserId)
    // user.accountIsPaid
}

function ownsRequestedProduct(req, res, next) {
    return true // such a middleware can be used as a "paywall"
}

export {
    isLoggedIn,
    isPaidAccount,
    ownsRequestedProduct,
}