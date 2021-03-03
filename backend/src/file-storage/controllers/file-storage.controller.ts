import * as express from 'express';
import * as fs from 'fs';

import { UPLOAD_PATH } from '../../utils';
import { processCSVFile } from '../../product-management/services/inventory.service';
import { processXMLFile } from '../../product-management/services/product.service';

export const readUploadFiles = async (req: express.Request, res: express.Response): Promise<void> => {
    processFiles(req.files as Express.Multer.File[]);
    res.send('uploaded');
}

export const uploadedFilesHistory = async (req: express.Request, res: express.Response): Promise<void> => {
    fs.readdir(UPLOAD_PATH, (err, files) => {
        if (!err) {
            files.forEach(file => {
                console.log(file);
            });
            res.send(files);
        } else {
            console.error(err);
        }
    });
}

const processFiles = async (files: Express.Multer.File[]) => {
    for (let index in files) {
        const file = files[index];
        const isXml = file.mimetype.split("/")[1] === 'xml';
        if (isXml) {
            await processXMLFile(file);
        } else {
            await processCSVFile(file);
        }
    }
}