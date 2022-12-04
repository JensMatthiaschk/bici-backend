import Rating from "../DB/Rating"



export async function createPinRating(request, response) {
    console.log("rating", request.body)
    console.log(request.token.id)
    try {
        await Rating.create({
            user: request.token.id,
            item: {
                refId: request.body.pinId,
                category: "MapPin"
            },
            ratingValue: request.body.ratingValue
        })
        return response.send({
            message: "rating succesful",
            success: true,
        })
    } catch (error) {
        return response.send({
            message: "rating failed",
            success: false,
        })

    }

}