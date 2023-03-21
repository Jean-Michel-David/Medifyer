import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AdminGetRechercheService {
  private backendUrl = "localhost/Medifyer/backend/mockDB.php";

  constructor(private http : HttpClient) {}

  getUserList() : Observable<User[]>{
    console.log('trying to get some data');
    return this.http.get<User[]>(this.backendUrl);
  }
}
