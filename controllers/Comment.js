import mongoose from "mongoose"
import Comment from "../DB/Comment.js"
import SetPin from "../DB/mapDB.js"


async function getPinComments(request, response) {
    console.log("PINID in GET Comments", request.body.pinId)
    if (request.body.pinId) {
        try {
            const pinComments = await Comment.find({
                pin_id: request.body.pinId
            })
            return response.send({
                message: "comments found for pin",
                success: true,
                data: pinComments
            })
        } catch (error) {
            return response.send({
                message: "Sorry we could not find the comments",
                success: false,
            })
        }
    }
}


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
    getPinComments,
    createComment,
}


export default CommentController 