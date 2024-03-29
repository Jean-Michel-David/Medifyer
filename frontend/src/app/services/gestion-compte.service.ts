import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../userInscription';

@Injectable({
  providedIn: 'root'
})
export class GestionCompteService {

  accountManagerUrl = environment.backendUrl + "/users/accountManager.php";

  constructor(private http: HttpClient) {}

  getUserInfos(): Observable<User> {
    return this.http.get<User>(this.accountManagerUrl);
  }

  sendUserInfos(user: User): Observable<string>{
    return this.http.post(this.accountManagerUrl, JSON.stringify(user), {responseType : 'text'})
  } 
  
}
