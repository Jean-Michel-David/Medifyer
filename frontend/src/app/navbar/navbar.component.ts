import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  background = "";
  router = new Router();
  location = location.pathname;
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if(window.scrollY > 50){
      this.background ="bg-dark";
    } else {
      this.background = "";
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe(() => this.location = location.pathname)
  }

}
