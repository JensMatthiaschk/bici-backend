import mongoose from "mongoose"

const CommentsSchema = new mongoose.Schema(
    {


        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            Body: {
                required: true,
                type: String
            }
        }
    },
    { timestamps: true }
)

CommentsSchema.pre("find", function () {
    this.populate("user")
})

const Comment = mongoose.model("Comment", CommentsSchema)

export default Comment