import express from "express"
const router = express.Router()
import {
    getUserProfile,
    editUserProfile,
} from "../controllers/UserProfile.js"
//import uploadAvatarImage from '../utilities/awsAvatarUpload.js'
import multerS3 from 'multer-s3'
import multer, { memoryStorage } from 'multer'
import { S3Client } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'
import dotenv from 'dotenv'
//import { compressImage } from "../utilities/aws.js"
dotenv.config()

// // // Avatar Upload
// // //AWS CREDENTIALS
const bucketName = process.env.AWSBucketName;
const bucketRegion = process.env.AWSBucketRegion;
const accessKey = process.env.AWSAccessKey;
const secretAccessKey = process.env.AWSSecretKey;

//UNIQUE HEX NAME FOR IMAGE IN KEY: BEFORE UPLOADING
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const ImageName = "avatar_images/" + randomImageName();
//const buffer = await sharp(req.file.buffer).resize({ height: 300, width: 300, fit: "contain" }).toBuffer()

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
})

// stroage = memoryStorage()
// const upload = multer({ storage: storage })

const upload = multer(
    {
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            fileFilter: (req, file, cb) => {
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            },
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, ImageName)
            }
        })
    }
)

router
    .route("/")
    .get(getUserProfile)

//MIDDLEWARE EXAMPLES
// function normalFunction(req, res, next) {
//     console.log("lol im a middleware")
//     next()
// }
// router.use(normalFunction)

router
    .route("/edit")
    .post(upload.single('avatar_img'),
        editUserProfile)

export default router

