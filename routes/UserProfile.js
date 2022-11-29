import express from "express"
const router = express.Router()
import {
    getUserProfile,
    editUserProfile,
} from "../controllers/UserProfile.js"
import multer, { memoryStorage } from 'multer'

// Avatar Upload

// const storage = memoryStorage()
// const upload = multer({ storage: storage })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './pics')
//     },
//     filename: (req, file, cb) => {
//         console.log(file),
//             cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// DELETE THIS
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
//    // req.file is the name of your file in the form above, here 'uploaded_file'
//    // req.body will hold the text fields, if there were any 
//    console.log(req.file, req.body)
// });

router
    .route("/")
    .get(getUserProfile)

router
    .route("/edit")
    .post(upload.single("avatar_img"), editUserProfile)

export default router