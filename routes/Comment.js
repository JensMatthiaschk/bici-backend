import express from "express"
import CommentController from "../controllers/Comment.js"
import * as auth from "../utilities/auth.js"

const router = express.Router()



const {
    getAllComments,
    createComment,
    deleteComment,
} = CommentController

router.route("/").get(getAllComments).post(createComment)
router.route("/:id").delete(deleteComment)

export default router