import SetPin from "../DB/mapDB";
import * as jwt from "../utilities/jwt.js"
import mongoose from "mongoose"


export const editMapPin = async (req, res) => {
    console.log('PINreq', req.token)
    console.log('pinbody', req.body)
    if (!req.token.id) {
        return res.status(404).send({
            message: "Map >You're not logged in ",
            success: false,
            data: null,
        })
    }
    try {

        //const userId = mongoose.Types.ObjectId();
        //let foundPin = await SetPin.findOne({ id: req.token.id })
        //   if (!foundProfile) {
        await SetPin.create(req.body, { user: req.token.id })
            /  /*  } else {
            foundProfile.update(, { new: true }, (err, data) => {
                if (err) return console.log(err)
                console.log(data)
            })
        } */

            res.send({
                message: "Map > Pin successfully set",
                data: foundPin,
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
/* 
export const getUserProfile = async (req, res) => {
    if (req.token?.id) {
        try {
            const userId = mongoose.Types.ObjectId(req.token.id);
            const user = await UserProfile.findOne({ user: userId })
            //console.log('foundUser', user)
            if (!user) {
                res.status(404).send({
                    message: "getUserProfile> User not found",
                    success: false,
                    data: user,
                })
            } else {
                res.status(200).send({
                    message: "getUserProfile> User found",
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
 */