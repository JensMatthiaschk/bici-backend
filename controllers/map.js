import SetPin from "../DB/mapDB";
import * as jwt from "../utilities/jwt.js"
import mongoose from "mongoose"
import { transform } from "./utils";







export const editMapPin = async (req, res) => {

    console.log('location', req.body.location)


    console.log('PINreq', req.token)
    if (!req.token.id) {
        return res.status(404).send({
            message: "Map >You're not logged in ",
            success: false,
            data: null,
        })
    }
    try {
        console.log('pinbody', req.body)
        console.log('just transform', parseFloat(transform(req.body.location)[1]))
        const userId = mongoose.Types.ObjectId(req.token.id);
        const coordiantes = req.body.location.slice(6)
        console.log(coordiantes)
        let foundPin = await SetPin.findOne({ location: [parseFloat(transform(req.body.location)[0]), parseFloat(transform(req.body.location)[1])] })
        console.log('founs?', foundPin)
        if (!foundPin) {
            await SetPin.create({
                user: userId,
                camping: req.body.camping,
                description: req.body.description,
                location: [parseFloat(transform(req.body.location)[0]), parseFloat(transform(req.body.location)[1])],
                events: req.body.events,
                host: req.body.events,
                reapir: req.body.events,
                shower: req.body.events,
                swim: req.body.events,
            })

        } else {
            foundPin.updateOne(req.body, { new: true }, (err, data) => {
                if (err) return console.log(err)
                console.log(data)
            })
        }

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