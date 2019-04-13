import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});

  username:string="";
  caption:string="";

  constructor(private uploadingService: ApiService) {}

  ngOnInit(){}

  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  uploadFiles() {

    
    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('photo' , file.rawFile, file.name);
      formData.append('username' , this.username);
      formData.append('caption' , this.caption);
      requests.push(this.uploadingService.uploadFormData(formData));

    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
    this.fileUploader = new FileUploader({});
  }
  

}
