import mongoose from 'mongoose'

export default function connectToDB () {mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(() => console.log('Could not connect to MongoDB'))}

