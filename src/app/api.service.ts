import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  DJANGO_API_SERVER: string = "http://localhost:8000";
  constructor(private http: HttpClient) { }
  

  public uploadFormData(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/add/`, formData);
  }

  public uploadcomment(formData) {
    return this.http.post<any>(`${this.DJANGO_API_SERVER}/comment/`, formData);
  }

  public getData() {
    return this.http.get(`${this.DJANGO_API_SERVER}/images/`);
  }

  public getComment() {
    return this.http.get(`${this.DJANGO_API_SERVER}/getcomment/`);
  }
}
