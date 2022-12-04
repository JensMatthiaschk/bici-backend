import mongoose from "mongoose"
import Comment from "../DB/Comment.js"
import SetPin from "../DB/mapDB.js"

async function getPinComments(request, response) {
    console.log("PINID", request.body)
    const pin_id = mongoose.Types.ObjectId(request.body.pin_id)
    const pin_data = await SetPin.find({ _id: pin_id })
    try {
        await Comment.find({
            pin_id: request.body.pin_id
        })
        return response.send({
            message: "comments found for pin" + request.body.pin_id,
            success: true,
            data: response
        })
    } catch (error) {
        return response.send({
            message: "Sorry we could not find the comments",
            succes: false,
        })
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