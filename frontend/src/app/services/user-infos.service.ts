import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfos } from '../recherche/user-infos';
import { User } from '../userInscription';

@Injectable({
  providedIn: 'root'
})
export class UserInfosService {

  UserUrl = environment.backendUrl + "/users/user.php";

  constructor(private http: HttpClient) {}

  getInfos(): Observable<UserInfos> {
    return this.http.get<UserInfos>(this.UserUrl);
  }
}
