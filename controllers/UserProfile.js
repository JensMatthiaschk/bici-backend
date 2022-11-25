import UserProfile from "../DB/UserProfile.js"
import * as jwt from "../utilities/jwt.js"
import mongoose from "mongoose"


export const getUserProfile = async (req, res) => {
    if (req.token?.id) {
        try {
            const user = await UserProfile.findById(req.token.id)
            console.log('user', user)
            if (!user) {
                res.status(404).send({
                    message: "UserProfile> User not found",
                    success: false,
                    data: user,
                })
            } else {
                res.status(200).send({
                    message: "UserProfile> User found",
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
            message: "UserProfile> You are not logged in",
            success: false,
        })
    }
}


export const editUserProfile = async (req, res) => {
    if (!req.token.id) {
        return res.status(404).send({
            message: "UserProfile>You're not logged in",
            success: false,
            data: null,
        })
    }
    try {
        const userId = mongoose.Types.ObjectId(req.token.id);
        let foundProfile = await UserProfile.findOne({ user: req.token.id })
        if (!foundProfile) {
            foundProfile = await UserProfile.create({ user: userId })
        } else {
            console.log(foundProfile)
            foundProfile.update(req.body, { new: true }, (err, data) => {
                if (err) return console.log(err)
                console.log(data)
            })
        }

        res.send({
            message: "UserProfile> Profile details successfully updated",
            data: foundProfile,
            success: true,
        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false,
            data: error,
        })
    }
}
