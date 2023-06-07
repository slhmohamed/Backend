const multer = require('multer');
const path = require('path');
//image upload
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, path.join("./upload/"));
    },
    filename: (req, file, cb) => {
         cb(null, Date.now() + file.originalname);
    }
});
// checking file type
const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'||file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Not an file! Please upload an file.', 400), false);
    }
};
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});