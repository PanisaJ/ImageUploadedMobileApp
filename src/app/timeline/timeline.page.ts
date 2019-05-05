import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});
  data: any;
  comment: any;
  id: any;
  allUsername: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
     
     this.id = this.route.snapshot.paramMap.get('id');
     this.apiService.getUsername().subscribe(res => {
                this.allUsername = res;
           });

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

  sendcomment(img) {
    if(this.comment){
    let requests = [];
    let formData = new FormData();
      
    formData.append('comment_text' , this.comment);
    formData.append('image' , img);
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
