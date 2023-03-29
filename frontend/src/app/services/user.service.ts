import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../userInscription';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = 'http://localhost/Medifyer/backend/users/user.php';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.backendUrl, JSON.stringify(user));
  }

}
