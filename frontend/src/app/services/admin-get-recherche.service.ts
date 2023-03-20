import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGetRechercheService {
  private backendUrl = "localhost/Medifyer/backend/mockDB.php";

  constructor(private http : HttpClient) {}

  getData() : Observable<any>{
    console.log('trying to get some data');
    return this.http.get<any>(this.backendUrl);
  }
}
