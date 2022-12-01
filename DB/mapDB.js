import mongoose from "mongoose"

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const MapSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            path: ""
        },
        camping: { type: Boolean, default: false },
        description: { type: String },
        location: {
            type: pointSchema,
            required: true
        },
        events: { type: Boolean, default: false },
        host: { type: Boolean, default: false },
        reapir: { type: Boolean, default: false },
        shower: { type: Boolean, default: false },
        swim: { type: Boolean, default: false },
        pin_img: {
            aws_url: { type: String },
            aws_name: { type: String }
        }
    },
    { timestamps: true }
)

MapSchema.pre("find", function () {
    this.populate("user")
})

const SetPin = mongoose.model("SetPin", MapSchema);

export default SetPin