import express from "express"
const router = express.Router()
import {
    getUserProfile,
    createUserProfile,
    editUserProfile,
} from "../controllers/UserProfile.js"

router
    .route("/profile")
    .post(createUserProfile)

router
    .route("/profile/:id")
    .get(getUserProfile)

router
    .route("/profile/:id/edit")
    .post(editUserProfile)

export default router