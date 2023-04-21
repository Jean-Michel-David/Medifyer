import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminInfobullesManagementService {
  private backendUrl = environment.backendUrl + "/admin/admin.php";

  constructor(private http : HttpClient) {}

  /**
   * 
   * @param libelle The name of the info to change
   * @param newText The new text for the info
   */
  setInfo(libelle : string, newText : string) : void {
    
  }
}
