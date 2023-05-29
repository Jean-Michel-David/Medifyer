import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  static emailUser: any;

  sendEmailUrl = environment.backendUrl + "/recup-password/sendEmail.php"
  emailVerifUrl = environment.backendUrl + "/email/emailVerification.php"


  constructor(private http: HttpClient) {}

  sendEmail(): Observable<any> {
    return this.http.post(this.sendEmailUrl, EmailSenderService.emailUser)
  }

  checkCode(code: String): Observable<any> {
    return this.http.post(this.emailVerifUrl, code)
  }
}
