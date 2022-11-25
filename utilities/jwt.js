import jwt from "jsonwebtoken"

const generateToken = (data) =>
    jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: "604800s" })

const decodeToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1]
            jwt.verify(token, `${process.env.JWT_SECRET}`, (err, token) => {
                if (err) {
                    next(new Error("token is unreadable"))
                } else {
                    req.token = token
                    next()
                }
            })
        } else {
            next()
        }
    } catch (error) {
        next()
    }
}

export {
    generateToken,
    decodeToken,
}