import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});

  caption:string="";
  id: any;

  constructor(private uploadingService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(){
        this.id = this.route.snapshot.paramMap.get('id');
  }

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
      formData.append('user' , this.id);
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
