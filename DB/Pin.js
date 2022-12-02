import mongoose from "mongoose";

const PinSchema = new mongoose.Schema (
    {
        name: String,
        location: {
            type:{
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates:{
                type:[Number],
                required: true
            }

            },
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        title: { required: true, type: String},  
        description: {required: true, type: String},
        reapare_station: Boolean,
        camping: Boolean,
        wildcamping: Boolean,
        toilet: Boolean,
        events: Boolean,
        host: Boolean,
        img_url: String
    })
    
    PinSchema.pre("find", function () {
        this.populate("user")
    })

const Pin = mongoose.model("Pin", PinSchema)

export default Pin