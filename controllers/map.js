import SetPin from "../DB/mapDB";
import * as jwt from "../utilities/jwt.js"
import mongoose from "mongoose"
import { transform, geoToArr } from "./utils";

export const editMapPin = async (req, res) => {
    if (!req.token.id) {
        return res.status(404).send({
            message: "Map >You're not logged in ",
            success: false,
            data: null,
        })
    }
    try {
        const userId = mongoose.Types.ObjectId(req.token.id);
        const coordinates = [parseFloat(transform(req.body.location)[0]), parseFloat(transform(req.body.location)[1])]

        let foundPin = await SetPin.findOne({
            location: {
                coordinates: coordinates
            }
        })
        if (!foundPin) {
            await SetPin.create({
                user: userId,
                camping: req.body.camping,
                description: req.body.description,
                location: {
                    type: "Point",
                    coordinates: coordinates
                },
                events: req.body.events,
                host: req.body.host,
                reapir: req.body.reapir,
                shower: req.body.shower,
                swim: req.body.swim,
                pin_imgs: req.files.map(e => ({
                    aws_url: e.location,
                    aws_name: e.key
                }
                ))
                // pin_imgs: [
                //     req.files.map((img) =>  {
                //         console.log("IMMMMMMMAAAG", img);
                //         return {aws_url: ${img.location},
                //     aws_name: ${img.key}}
                //     })]
            })

        } else {
            foundPin.updateOne(req.body, { new: true }, (err, data) => {
                if (err) return console.log(err)
                console.log(data)
            })
        }

        res.send({
            message: "Pin successfully set o updated",
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



export const getPins = async (req, res) => {
    console.log(Math.random())
    const northEastArr = geoToArr(req.body._northEast)
    const southWestArr = geoToArr(req.body._southWest)
    console.log('North', northEastArr, 'South', southWestArr)
    SetPin.find({
        location: {
            $geoWithin: {
                $box:
                    [
                        northEastArr,
                        southWestArr
                    ]

            }
        }
    }).find((error, results) => {
        if (error) console.log(error);
        res.json(results);
    });


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