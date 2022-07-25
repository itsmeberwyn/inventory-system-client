import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { RouteListenerService } from './../../services/route-listener.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import ProgressBar from '@badrap/bar-of-progress';
import { RequestParams } from 'src/app/models/RequestParams';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  @ViewChild('drawer') drawer: any;
  currentRoute = '';
  activeUser: any =
    localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user') || 'Unknown user');

  isExpanded = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private routeListner: RouteListenerService,
    private dataService: DataService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routeListner.currentRoute.subscribe((route: any) => {
      this.currentRoute = route;
    });
  }

  ngAfterViewInit() {
    this.drawer.toggle();
    this.cdr.detectChanges();
  }

  isNumber(val: any): boolean {
    if (parseInt(val) >= 0) {
      return true;
    }
    return typeof val === 'number';
  }

  logout() {
    this.progress.start();
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/logout`;
    requestParams.Body = '';

    this.dataService.httpRequest('POST', requestParams).subscribe(
      (data: any) => {
        setTimeout(() => {
          if (this.currentRoute[1] === 'inventory') {
            this.router.navigate(['/']);
          } else if (this.currentRoute[1] === 'pointofsale') {
            this.router.navigate(['/pos-login']);
          } else {
            this.router.navigate(['/sr-login']);
          }

          this.userService.logOut();
          this.progress.finish();
        }, 100);
      },
      (error: any) => {
        setTimeout(() => {
          this.progress.finish();
          Swal.fire('Failed!', error['error']['status'].message, 'error');
        }, 100);
      }
    );
  }
}
