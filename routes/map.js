import express from "express";
import { editMapPin } from "../controllers/map";
import { S3Client } from '@aws-sdk/client-s3'
import multer, { memoryStorage } from 'multer'
import multerS3 from 'multer-s3'
import crypto from 'crypto'
import sharp from 'sharp'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router();

// // // PinImages Upload
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
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, ImageName)
            }
        })
    }
)
/* router
    .route("/")
    .get(getPins)
 */
router
    .route("/pinit")
    .post(upload.single("pin_img"), editMapPin)
//upload.array('photos', 3)

export default router