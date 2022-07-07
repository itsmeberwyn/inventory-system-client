import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-inventory',
  templateUrl: './main-inventory.component.html',
  styleUrls: ['./main-inventory.component.css'],
})
export class MainInventoryComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.drawer.toggle();
  }
}
