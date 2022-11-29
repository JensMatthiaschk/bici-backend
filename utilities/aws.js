
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto'
import sharp from 'sharp'
import dotenv from 'dotenv'
dotenv.config()

//UNIQUE HEX NAME FOR IMAGE IN KEY: BEFORE UPLOADING
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

//RESIZING IMAGES


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

    // console.log("AVATARIMAGE", req)
    const params = {
        Bucket: bucketName,
        Key: randomImageName(),
        Body: buffer,
        ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)


    
    // await s3.send(command, (err, data) => {
    //     if (err) {
    //         reject(err)
    //     } else {
    //         resolve(data.Location)
    //     }
    // })
}
// const s3 = new AWS.S3({
//     bucketName: process.env.AWSBucketName,
//     buckeRegion: process.env.AWSBucketRegion,
//     credentials: {
//         accessKeyId: process.env.AWSAccessKey,
//         secretAccessKey: process.env.AWSSecretKey,
//     }
// })

// const uploadImage = (filename, biciappimages, avatar_img) => {

//     return new Promise((resolve, reject) => {
//         const params = {
//             Key: filename,
//             Bucket: biciappimages,
//             Body: avatar_img,
//             ContentType: 'image/png',
//             ACL: 'public-read'
//         }

//         s3.upload(params, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data.Location)
//             }
//         })
//     })
// }

// module.exports = uploadImage