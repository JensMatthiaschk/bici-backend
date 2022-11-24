import mongoose from "mongoose"


const ProfileSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        nickname: { type: String },
        address: { type: String },
        location: { type: String },
        description: { type: String },
        bikeType: { type: String },
        cell: { type: String },
        birthday: { type: Date },
        privacy: { type: boolean, default: true },
        role: { type: String, default: "User" },
        avatar_url: { type: String, default: "https://placeimg.com/80/80/people" }
    },
    { timestamps: true }
)

ProfileSchema.pre("find", function () {
    this.populate("User")
})

const UserProfile = mongoose.model("UserProfile", ProfileSchema);

export default UserProfile