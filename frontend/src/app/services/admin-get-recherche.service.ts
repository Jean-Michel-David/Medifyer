import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGetRechercheService {
  private backendUrl = "http://localhost/Medifyer/backend/mockDB.php";

  constructor(private http : HttpClient) {}

  getUserList(page? : number, search? : string) : Observable<User[]>{
    // TODO : add security token or something
    console.log('Requesting user list');
    
    if (typeof(search) === "undefined" || search!.length < 1)
      return this.http.get<User[]>(this.backendUrl + "?getUserList=&page=" + page); // Initial list / list without search
    
    return this.http.get<User[]>(this.backendUrl + "?getUserList=" + search + 
    "&page=" + (typeof(page) === undefined ? 1 : page));
  }
}
