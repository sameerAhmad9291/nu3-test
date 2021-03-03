import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.sass']
})
export class FileUploadComponent implements OnInit {

  files!: FileList;
  uploadHistory: string[] = [];

  loading = false;
  submitted = false;

  constructor(private fileUploadService: FileUploadService) {  }

  ngOnInit(): void {
    this.fileUploadService.getHistory().subscribe(data => {
      this.uploadHistory = data;
    }, error => {
      console.log(error);
    });
  }

  public onChange(event: any): void {
    if (event.target?.files?.length) {
      this.files = event.target?.files;
    }
  }

  onSubmit() {
    this.fileUploadService.upload(this.files).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }
}
