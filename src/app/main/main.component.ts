import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.drawer.toggle();
  }
}
