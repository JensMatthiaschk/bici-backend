import express from "express";
import { editMapPin } from "../controllers/map";
const router = express.Router();


/* router
    .route("/")
    .get(getPins)
 */
router
    .route("/pinit")
    .post(editMapPin)

export default router