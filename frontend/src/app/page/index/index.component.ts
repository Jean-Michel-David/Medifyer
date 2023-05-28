import { Component, OnInit } from '@angular/core';
import { UserInfosService } from 'src/app/services/user-infos.service';

@Component({
  selector: 'app-page-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isConnected = false;
  constructor(private userInfos:UserInfosService){}

  ngOnInit(): void {
    this.checkConnection();
  }

  checkConnection(){
    if(localStorage.getItem("authenticationToken") != null){
      let sub = this.userInfos.getInfos().subscribe({
        next : response => {
          this.isConnected = response.isConnected;
          sub.unsubscribe();
        }, error : () => {
          this.isConnected = false;

          sub.unsubscribe();
        }
      });
    } else {
      this.isConnected = false;
    }
  }
}
