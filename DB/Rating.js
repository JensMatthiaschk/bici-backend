import mongoose from "mongoose"


const RatingSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        item: {
            refId: {
                required: true,
                type: String,
            }, category: {
                required: true,
                type: String,
            }
        },
        ratingValue: {
            required: true,
            type: String,
        },
    })
RatingSchema.pre("find", function () {
    this.populate("user")
})

const Rating = mongoose.model("Rating", RatingSchema)

export default Rating
