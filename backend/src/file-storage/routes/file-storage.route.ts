import * as express from 'express';
import { uploadedFilesHistory, readUploadFiles } from '../controllers/file-storage.controller';
import { UPLOAD_PATH } from '../../utils';
const multer = require('multer');

const router = express.Router();
const upload = multer({
    dest: UPLOAD_PATH,
    fileFilter: (req, file, cb) => {
        console.log(file?.mimetype);
        if (["text/xml", "text/csv", "application/vnd.ms-excel"].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .csv and .xml format allowed!'));
        }
    },
});

router.post('/', upload.array('files'), readUploadFiles);

router.get('/upload-history', uploadedFilesHistory);

export default router;