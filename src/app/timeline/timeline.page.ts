import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});
  data: any;
  comment: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
     this.showtimeline();
     this.showComment();
  }

  showtimeline(){
     this.apiService.getData().subscribe(res => {
     this.data = res;
    });
  }

  showComment(){
     this.apiService.getComment().subscribe(res => {
     this.comment = res;
    });
  }

  sendcomment(id) {
    if(this.comment){
    let requests = [];
    let formData = new FormData();
      
    formData.append('comment_text' , this.comment);
    formData.append('photoID' , id);
    requests.push(this.apiService.uploadcomment(formData));

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
  

}
