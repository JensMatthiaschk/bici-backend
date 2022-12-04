import Rating from "../DB/Rating"
import mongoose from "mongoose";

export async function createPinRating(request, response) {
    const user = mongoose.Types.ObjectId(request.token.id);
    const foundPin = await Rating.find({
        user: user,
        item: {
            refId: request.body.pinId,
            category: "MapPin"
        }
    })
    console.log("FOundPin", foundPin)
    if (!foundPin) {
        try {
            const newRating = await Rating.create({
                user: user,
                item: {
                    refId: request.body.pinId,
                    category: "MapPin"
                },
                ratingValue: request.body.ratingValue
            })
            return response.send({
                message: "rating succesful",
                success: true,
            })
        } catch (error) {
            return response.send({
                message: "rating failed",
                success: false,
            })
        }
    } else {
        try {
            const updateExisting = await foundPin[0].updateOne({ ratingValue: request.body.ratingValue }, { new: true }, (err, data) => {
                if (err) {
                    return {
                        message: "Rating> rating updated succesfully",
                        data: err,
                        success: false,
                    }
                }
                else {
                    return {
                        message: "Rating> updating current rating failed",
                        data: data,
                        success: true,
                    }
                }
            })
            console.log(response.message)
            return response.send({
                message: "rating updated succesfully",
                success: true,
            })
        } catch (error) {
            console.log(error.message)
            return response.send({
                message: "updating current rating failed",
                success: false,
            })
        }
    }
}


export async function getPinRating(request, response) {
    console.log("PINID IN GETRATINGS", request.body.pinId)
    if (request.body.pinId) {
        try {
            const pinRatings = await Rating.find({
                item: {
                    refId: request.body.pinId,
                    category: "MapPin"
                }
            })
            return response.send({
                message: "ratings found for pin",
                success: true,
                data: pinRatings
            })
        } catch (error) {
            return response.send({
                message: "Sorry we could not find the ratings for this pin",
                success: false,
            })
        }
    }
}