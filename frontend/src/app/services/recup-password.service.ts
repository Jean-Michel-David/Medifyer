import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../userInscription';

@Injectable({
  providedIn: 'root'
})
export class RecupPasswordService {

  emailURL = environment.backendUrl + "/recup-password/sendEmail.php";
  modifyURl = environment.backendUrl + "/users/accountManager.php";

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Observable<any>{
    return this.http.post(this.emailURL,email,{responseType : 'text'})
  }

  modifyPassword(user: User): Observable<String> {
    return this.http.post(this.modifyURl, JSON.stringify(user), {responseType : 'text'})
  }
}
