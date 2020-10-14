import { Component, OnInit } from '@angular/core';
import {CoreDataService} from './services/core-data.service';
import {Router, NavigationEnd} from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'resume-builder-web';
  constructor(public coreDataService: CoreDataService, public router: Router) {
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    AOS.init({
      duration: 400,
    });
  }
  onActivate(e, outlet){
    outlet.scrollTop = 0;
  }
}
