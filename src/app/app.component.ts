import { RouteListenerService } from './services/route-listener.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'inventory-mngmt-system';

  constructor(private router: Router, private listener: RouteListenerService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // event is an instance of NavigationEnd, get url!
        const url = event.urlAfterRedirects.split('/');

        this.listener.currentRoute.next(url);
      }
    });
  }
}
