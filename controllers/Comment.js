import Comment from "../DB/Comment.js"

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
}

async function createComment(request, response) {
    const comment = {
        from: request.token.id,
        comment: request.body.comment,
        user: request.token.id
    }
    const res = await Comment.create(comment)
}