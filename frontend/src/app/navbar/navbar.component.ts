import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  background = "";
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if(window.scrollY > 50){
      this.background ="bg-dark";
      console.log("scrolled");
    } else {
      this.background = "";
    }
  }
}
