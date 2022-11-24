import UserProfile from "../DB/UserProfile.js"
import * as jwt from "../utilities/jwt.js"

export const getUserProfile = async (req, res) => {
    if (req.token?.id) {
        try {
            const user = await UserProfile.findById(req.token.id)
            console.log('user', user)
            if (!user) {
                res.status(404).send({
                    message: "User not found",
                    success: false,
                    data: user,
                })
            } else {
                console.log('res', res.ok)
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


export const createUserProfile = async (req, res) => {
    try {
        const user = UserProfile.findById(req.body.id)
        if (!user) {
            res.status(404).send({
                message: "User not found",
                success: false,
                data: user,
            })
        }
        else {
            await UserProfile.create(req.body)
            res.send({
                message: "Profile details successfully created",
                data: user,
                success: true,
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
            data: error,
        })
    }
}

export const editUserProfile = async (req, res) => {
    try {
        const user = await UserProfile.findByIdAndUpdate(req.body)
        console.log(">>>", req.body.id);
        if (!req.body.id) {
            res.status(404).send({
                message: "User not found",
                success: false,
                data: user,
            })
        } else {
            res.send({
                message: "Profile details successfully updated",
                data: user,
                success: true,
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
            data: error,
        })
    }
}
