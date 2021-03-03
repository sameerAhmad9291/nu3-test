
import * as util from 'util';
import * as fs from 'fs';

export const UPLOAD_PATH = '../uploads/';
export const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8').then(data => data);