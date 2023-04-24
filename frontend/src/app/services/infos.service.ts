import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../info';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfosService {
  backendUrl = environment.backendUrl + "/infos/infos.php";

  constructor(private http : HttpClient) {}

  /**
   * This function will fetch the info from its label
   * @param label The label of the requested infobulle
   * @returns the Info infobulle
   */
  getInfo(label : string) : Observable<Info> {
    let info! : Info;
    
    return this.http.get<Info>(this.backendUrl + "?getInfo=" + label);
  }

  getAllInfobulles() : Observable<Info[]> {
    return this.http.get<Info[]>(this.backendUrl + "?getAllInfobulles=")
  }
}
