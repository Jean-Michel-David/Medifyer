import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../userInscription';

@Injectable({
  providedIn: 'root'
})
export class RecupPasswordService {

  static userMail: any;
  emailURL = environment.backendUrl + "/recup-password/sendEmail.php";
  modifyURl = environment.backendUrl + "/recup-password/password.php";

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Observable<any>{
    return this.http.post(this.emailURL,email)
  }

  modifyPassword(user: User): Observable<String> {
    return this.http.post(this.modifyURl, JSON.stringify(user), {responseType : 'text'})
  }
}
