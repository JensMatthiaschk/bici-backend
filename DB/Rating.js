import mongoose from "mongoose"


const RatingSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        item: {
            targetId: {
                required: true,
                type: String,
            }, category: {
                required: true,
                type: String,
            }
        },
        rating: {
            required: true,
            type: Number
        },
    })
RatingSchema.pre("find", function () {
    this.populate("user")
})

const Rating = mongoose.model("Rating", RatingSchema)

export default Rating
