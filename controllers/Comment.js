import { request } from "express"
import Comment from "../DB/Comment.js"
/* 
async function getAllComments(request, response) {
    try {
        if (request.token?.id) {
            const comments = await Comment.find({ user: request.token.id })
            response.json({
                message: "all comments",
                data: comments,
                succes: true
            })
        } else {
            response.status(401).send({
                message: "You must be logged in to get messages",
                success: false,
                data: null
            })
        }
    } catch (error) {
        response.status(400).send({
            message: error.message,
            succes: false,
            data: error
        })
    }
} */


async function createComment(request, response) {
    console.log("comment", request.body)
    try {
        await Comment.create({
            user: request.token.id,
            comment: request.body.comment,
            pin_id: request.body.pin_id
        })
        return response.send({
            message: "commenting succesful",
            success: true,
        })
    } catch (error) {
        return response.send({
            message: "commenting failed",
            success: false,
        })

    }

}
/* 
async function deleteComment(request, response) {
    const commment = await Comment.findByIdAndDelete(request.params.id)
    response.json(commment)
}
*/
const CommentController = {

    createComment,

}
export default CommentController 