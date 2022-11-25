import User from "../DB/User.js"
import UserProfile from '../DB/UserProfile.js'
import * as jwt from "../utilities/jwt.js"
export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.json(users)
}
export const createUser = async (req, res) => { // create a new user
    // if (process.env.INVITE_ONLY) {
    //     if (!req.body.invite_id) {
    //         res.status(400).send({
    //             message: "invite only loserrrrrr",
    //             success: false,
    //         })
    //     }
    //}
    try {

        // const inviter = await User.find({ invite_id: req.body.invite_id })
        // const { name, email, password } = req.body;
        // const userExists = await User.findOne({ email: email });
        // if (userExists)
        //     return res.status(409).send("User Already Exists. Please Login.");


        const user = await User.create(req.body)
        const userProfile = await UserProfile.create({ user: user._id })

        res.send({
            message: "User created successfully",
            data: { user, userProfile },
            success: true,
            jwt: jwt.generateToken({ id: user._id }),
        })
    } catch (error) {
        switch (error.code) {
            case 11000:
                res.status(400).send({
                    message:
                        "User with this email already exists, please try logging in",
                    success: false,
                    data: error,
                })
                break
            default:
                res.status(400).send({
                    message: error.message,
                    success: false,
                    data: error,
                })
        }
    }
}

export const login = async (req, res) => {
    console.log(req.body.email, req.body.password)
    try {
        // does a user with this email exist?
        // if we re-encode the password they just sent to us.. does it match the one in the DB?
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error) {
                console.log(error)
                res.send({
                    message: error.message,
                    success: false,
                    data: error,
                })
            } else {
                console.log(req.body.email + " logged in successfully")
                res.send({
                    message: "User logged-in successfully",
                    data: user,
                    success: true,
                    jwt: jwt.generateToken({ id: user._id }),
                })
            }
        })
    } catch (error) {
        switch (error.code) {
            default:
                console.log(req.body.email + " failed to login  ")
                res.status(400).send({
                    message: error.message,
                    success: false,
                    data: error,
                })
        }
    }
}

export const me = async (req, res) => {
    if (req.token?.id) {
        try {
            const user = await User.findById(req.token.id)
            console.log('user', user)
            if (!user) {
                res.status(404).send({
                    message: "User not found",
                    success: false,
                    data: user,
                })
            } else {
                res.status(200).send({
                    message: "User found",
                    success: true,
                    data: user,
                })
            }
        } catch (error) {
            res.status(400).send({
                message: error.message,
                success: false,
                data: error,
            })
        }
    } else {
        res.status(401).send({
            message: "You are not logged in",
            success: false,
        })
    }
}


export const getUser = async (req, res) => {
    const user = await User.find({ _id: req.params.id })
    res.json(user)
}

export const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    })
    res.json(user)
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user)
}