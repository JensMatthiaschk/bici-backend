import express from "express"
const router = express.Router()
import {
    getUserProfile,
    editUserProfile,
} from "../controllers/UserProfile.js"

router
    .route("/")
    .get(getUserProfile)

router
    .route("/edit")
    .post(editUserProfile)

export default router