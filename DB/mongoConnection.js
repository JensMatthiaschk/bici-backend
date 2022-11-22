import mongoose from "mongoose"
import chalk from "chalk"

async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log(chalk.yellow("CONNECTED TO MONGODB"))
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB