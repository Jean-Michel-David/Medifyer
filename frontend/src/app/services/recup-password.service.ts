import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecupPasswordService {

  emailURL = environment.backendUrl + "/recup-password/sendEmail.php"

  constructor(private http: HttpClient) { }

  sendEmail() {
    return this.http.post(this.emailURL,{responseType : 'text'})
  }
}
