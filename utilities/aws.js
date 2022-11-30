
import AWS from 'aws-sdk'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto'
import sharp from 'sharp'
import dotenv from 'dotenv'
dotenv.config()

//UNIQUE HEX NAME FOR IMAGE IN KEY: BEFORE UPLOADING
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const bucketName = process.env.AWSBucketName;
const bucketRegion = process.env.AWSBucketRegion;
const accessKey = process.env.AWSAccessKey;
const secretAccessKey = process.env.AWSSecretKey;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
})

export const uploadAvatarImage = async (req) => {

    //RESIZING BEFORE UPLOAD
    const buffer = await sharp(req.file.buffer).resize({ height: 300, width: 300, fit: "contain" }).toBuffer()
    const ImageName = "avatar_images/" + randomImageName();
    // console.log("AVATARIMAGE", req)
    const params = {
        Bucket: bucketName,
        Key: ImageName,
        Body: buffer,
        ContentType: req.file.mimetype,
    }

    const putCommand = new PutObjectCommand(params)
    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: ImageName,
    });
    try {
        const data = await s3.send(putCommand)
        //const getObjectResult = await s3.send(getCommand);
        console.log("ImageName", ImageName)
        const url = await getSignedUrl(s3, getCommand)
        return {
            message: "AWS>Image successfully uploaded",
            success: true,
            data: { aws_url: url, aws_name: ImageName }
        }
    }
    catch (error) {
        return {
            message: "AWS>Image Upload not successfull",
            success: false,
            data: error,
        }
    }
}

// DELETE IMAGE

//export const deleteAvatarImage = async (req) => {
    //let foundProfile = await UserProfile.findOne({ avatar_img: req.body.avatar_img })
    //const ImageName = req.avatar_img.name ???
    // try {
    //     const params = {
    //         Bucket: bucketName,
    //         Key: ImageName,
    //     }
    //     const command = new DeleteObjectCommand(params)
    //     const foundImage = s3.send(command)

    //     console.log("FOUND ME", foundImage)
    // } catch (error) {
    //     console.log(error)
    // }
//}


// GET IMAGE

// export const getAvatarImage = async (req) => {
    //     try {
//     const params = {
//         Bucket: bucketName,
//         Key: ImageName,
//     }
//     const command = new GetObjectCommand(params)
// const foundImage = s3.send(command)
//         
//      console.log("FOUND ME", foundImage)
//     } catch (error) {
//         console.log(error)
//     }
// }
// getAvatarImage()