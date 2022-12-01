import UserProfile from "../DB/UserProfile.js"
import * as jwt from "../utilities/jwt.js"
import mongoose from "mongoose"
import { uploadAvatarImage } from "../utilities/aws.js"
import { urlencoded } from "express"

export const getUserProfile = async (req, res) => {
    if (req.token?.id) {
        try {
            const userId = mongoose.Types.ObjectId(req.token.id);
            const user = await UserProfile.findOne({ user: userId })
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


export const editUserProfile = async (req, res) => {
    //let foundProfile;
    if (!req.token.id) {
        return res.status(404).send({
            message: "UserProfile>You're not logged in",
            success: false,
            data: null,
        })
    }
    try {
        if (req.file) {
            const imageUpload = await uploadAvatarImage(req)
            const userId = mongoose.Types.ObjectId(req.token.id);
            const foundProfile = await UserProfile.findOne({ user: req.token.id })
            if (!foundProfile) {
                foundProfile = await UserProfile.create({ user: userId })
                return {
                    message: "UserProfile> Profile details successfully created",
                    data: foundProfile,
                    success: true,
                }
            } else {
                foundProfile.updateOne({
                    nickname: req.body.nickname,
                    address: req.body.address,
                    location: "",
                    description: req.body.description,
                    bikeType: req.body.bikeType,
                    cell: req.body.cell,
                    birthday: req.body.birthday,
                    privacy: true,
                    role: "",
                    avatar_img: {
                        aws_url: imageUpload.data.aws_url,
                        aws_name: imageUpload.data.aws_name
                    }
                }, { new: true }, (err, data) => {
                    if (err) {
                        return {
                            message: "UserProfile> Updating UserProfile not succesful",
                            data: err,
                            success: false,
                        }
                    }
                    else {
                        return {
                            message: "UserProfile> Profile details successfully updated",
                            data: data,
                            success: true,
                        }
                    }
                })
            }
        } else {
            const userId = mongoose.Types.ObjectId(req.token.id);
            const foundProfile = await UserProfile.findOne({ user: req.token.id })
            if (!foundProfile) {
                foundProfile = await UserProfile.create({ user: userId })
                return {
                    message: "UserProfile> Profile details successfully created",
                    data: foundProfile,
                    success: true,
                }
            } else {
                foundProfile.updateOne(req.body, { new: true }, (err, data) => {
                    if (err) {
                        return {
                            message: "UserProfile> Updating UserProfile not succesful",
                            data: err,
                            success: false,
                        }
                    }
                    else {
                        return {
                            message: "UserProfile> Profile details successfully updated",
                            data: data,
                            success: true,
                        }
                    }
                })
            }
        }
        res.send({
            message: "UserProfile> Profile details successfully updated",
            data: res.data,
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
