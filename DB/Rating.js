import mongoose from "mongoose"


const RatingSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        pin: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "SetPin",
        },
        rating: { required: Number }
    })
RatingSchema.pre("find", function () {
    this.populate("user")
})

RatingSchema.pre("find", function () {
    this.populate("Comment")
})

RatingSchema.pre("find", function () {
    this.populate("SetPin")
})

const Rating = mongoose.model("Rating", RatingSchema)

export default Rating
