import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  emailVerif = environment.backendUrl + "/email/emailVerification.php"

  constructor(private http: HttpClient) {}

  checkCode(code: String): Observable<any> {
    return this.http.post(this.emailVerif, code, {responseType : 'text'})
  }
}
