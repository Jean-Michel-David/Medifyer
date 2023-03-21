import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AdminGetRechercheService {
  private backendUrl = "http://localhost/Medifyer/backend/mockDB.php";

  constructor(private http : HttpClient) {}

  getUserList() : Observable<User[]>{
    console.log('Requesting user list');
    return this.http.get<User[]>(this.backendUrl + "?getUserList=true");
  }
}
