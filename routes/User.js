import express from "express"
const router = express.Router()
import {
    getAllUsers,
    createUser,
    login,
    me,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/User.js"

router
    .route("/")
    .get(getAllUsers)
    
router.route("/register").post(createUser)

router.route("/login").post(login)

router.post("/me", me)


export default router