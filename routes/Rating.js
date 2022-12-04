import express from "express";
import { createPinRating } from "../controllers/Rating";

const router = express.Router()


router.route("/")
    .post(createPinRating)

export default router