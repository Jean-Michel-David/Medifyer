import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import { UserInfosService } from '../services/user-infos.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  background = "";
  location = location.pathname;
  isConnected = false;
  isAdmin = false;
  initials = "";

  constructor(private userInfos:UserInfosService, private router:Router){
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if(window.scrollY > 50){
      this.background ="bg-dark";
    } else {
      this.background = "";
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.location = location.pathname;
      if(event instanceof NavigationEnd) this.checkConnection();
    });
  }

  checkConnection(){
    if(localStorage.getItem("authenticationToken") != null){
      let sub = this.userInfos.getInfos().subscribe({
        next : (response) => {
          this.isConnected = response.isConnected??false;
          this.isAdmin = response.isAdmin;
          this.initials = response.firstname.charAt(0) + response.lastname.charAt(0);
          sub.unsubscribe();
        }, error : () => {
            this.isConnected = this.isAdmin = false;
            this.initials = "";
        }
      });
    } else {
      this.isConnected = this.isAdmin = false;
    }
  }

  disconnect(){
    localStorage.removeItem('authenticationToken');
    this.checkConnection();
    this.router.navigateByUrl("/");
  }
}
