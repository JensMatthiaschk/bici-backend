import mongoose from "mongoose";



const ProfileSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },

)

ProfileSchema.pre("find", function () {
    this.populate("user")
})


const Profile = mongoose.model("Profile", ProfileSchema)

export default Profile