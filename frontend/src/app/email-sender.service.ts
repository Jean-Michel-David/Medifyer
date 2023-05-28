import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  sendEmailURl = environment.backendUrl + "/email"

  constructor(private http: HttpClient) {}

  sendVerificationEmail() {
    return this.http.post(this.sendEmailURl, {responseType : 'text'})
  }
}
