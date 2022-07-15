import { RouteListenerService } from './../../services/route-listener.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  currentRoute = '';

  isExpanded = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private routeListner: RouteListenerService
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
}
