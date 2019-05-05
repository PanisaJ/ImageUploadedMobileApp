import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';
import {Md5} from 'ts-md5/dist/md5'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public fileUploader: FileUploader = new FileUploader({});

  username: any;
  password1: any;
  password2: any;
  nameDuplicate: boolean=false;
  error_message: any = "";
  allUsername: any = [];

  constructor(private apiService: ApiService,public navCtrl: NavController) { }

  ngOnInit() {
     this.apiService.getUsername().subscribe(res => {
                this.allUsername = res;
           });
  }

  Register() {
      if(this.username && this.password1 && this.password2){
           
           for(let name of this.allUsername){
               if(this.username == name.username){
                      this.nameDuplicate = true;
               }
           }

           if(this.password1 == this.password2 && !this.nameDuplicate)
           {
              let requests = [];
              let formData = new FormData();
              let encode = (Md5.hashStr(this.password1) as string);
              formData.append('username' , this.username);
              formData.append('password' , encode);
              requests.push(this.apiService.registerUser(formData));

              concat(...requests).subscribe(
               (res) => {
                  console.log(res);
                  },
               (err) => {  
                  console.log(err);
                  }
              );
              this.fileUploader = new FileUploader({});

              this.navCtrl.navigateRoot('/login');

           }else{
              if(this.nameDuplicate){
                   this.error_message = "username already taken";
              }
              if(this.password1 != this.password2){
                   this.error_message = "Your passwords didn't match";
              }
           }

      }else{
         this.error_message = "some inputs are empty.";
      }
   }
}
