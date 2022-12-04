import express from "express";
import { createPinRating, getPinRating } from "../controllers/Rating";

const router = express.Router()


router.route("/")
    .post(createPinRating)

router.route("/get")
    .post(getPinRating)

export default router