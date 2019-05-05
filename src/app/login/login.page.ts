import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import {Md5} from 'ts-md5/dist/md5'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  allUsername: any = [];
  username: any;
  password: any;
  error_message: any;
  id: any;

  constructor(private apiService: ApiService, public navCtrl: NavController) { }

  ngOnInit() {
      this.apiService.getUsername().subscribe(res => {
                this.allUsername = res;
           });
  }

  update(){
      this.apiService.getUsername().subscribe(res => {
                this.allUsername = res;
           });
  }

  login(){
    if(this.username && this.password){
       if(this.checkUserExisted()){
          
          this.navCtrl.navigateForward('/timeline/'+this.id);
       }else{
         this.error_message = "username or password're mistake";
       }
    }else{
           this.error_message = "some inputs're empty";
    }  
  }

  checkUserExisted(){
      for(let name of this.allUsername){
           if(name.username == this.username && name.password == (Md5.hashStr(this.password) as string)){
                this.id = name.id;
                return true;
           }
      }
      return false;
  }
}
