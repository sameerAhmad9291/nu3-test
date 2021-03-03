import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../constants';

@Injectable({ providedIn: 'root' })
export class FileUploadService {

    constructor(private http: HttpClient) {
    }

    upload(files: FileList) {
        const endpoint = `${config.apiUrl}/file-storage`;
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        return this.http
            .post(endpoint, formData)
            .pipe(map(files => {
                return files;
            }));
    }

    getHistory() {
        return this.http.get<any>(`${config.apiUrl}/file-storage/upload-history`)
            .pipe(map(files => {
                return files;
            }));
    }
}