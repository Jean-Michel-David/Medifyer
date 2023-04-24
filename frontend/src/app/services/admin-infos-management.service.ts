import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Info } from '../info';


@Injectable({
  providedIn: 'root'
})
export class AdminInfosManagementService {
  private backendUrl = environment.backendUrl + "/admin/admin.php";

  constructor(private http : HttpClient) {}

  /**
   * 
   * @param libelle The name of the info to change
   * @param newText The new text for the info
   */
  setInfo(libelle : string, newText : string) : Observable<Object> {
    let info : Info = {label : libelle,text :  newText};
    return this.http.post(this.backendUrl, JSON.stringify(info)); 
  }
}
