import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../userInscription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserUrl = environment.backendUrl + "/users/user.php";
  loginUrl = environment.backendUrl + "/users/login.php";

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<boolean> {
    return this.http.post(this.UserUrl, JSON.stringify(user), { responseType : 'text'})
    .pipe(map((res : any) => {
        if (res.status < 200 ||res.status > 299) {
          console.log("problem : " + res);
          return false;
        }
        console.log("received token : " + res);
        localStorage.setItem('authenticationToken', res);
        return true;
    }))

  }

  login(user: User): Observable<boolean>{
    return this.http.post(this.loginUrl, JSON.stringify(user), {responseType : 'text'})
    .pipe(map((res : any) => {
      if (res.status < 200 || res.status > 299) {
        return false;
      }
      console.log("received token: " + res);
      localStorage.setItem('authenticationToken', res);
      return true;
    }
    ))
  }

  deleteUser(): Observable<boolean> {
    return this.http.delete<boolean>(this.UserUrl);
  }
}
