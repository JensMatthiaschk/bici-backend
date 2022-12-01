import express from "express";
import { editMapPin, getPins } from "../controllers/map";
const router = express.Router();



router
    .route("/pinit")
    .post(editMapPin)

router
    .route("/getpins")
    .post(getPins)
export default router