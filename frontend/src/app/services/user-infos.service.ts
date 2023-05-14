import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  UserUrl = environment.backendUrl + "/users.user.php";

  constructor(private http: HttpClient) {}

  getInfos(): Observable<String> {
    return this.http.get<String>(this.UserUrl);
  }
}
