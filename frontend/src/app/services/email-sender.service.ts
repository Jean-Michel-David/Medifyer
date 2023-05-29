import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  sendEmailURl = environment.backendUrl + "/email/emailVerification.php"

  constructor(private http: HttpClient) {}

  sendVerificationEmail() {
    return this.http.get(this.sendEmailURl, {responseType : 'text'})
  }

  checkCode(code: String): Observable<any> {
    return this.http.post(this.sendEmailURl, code, {responseType : 'text'})
  }
}
