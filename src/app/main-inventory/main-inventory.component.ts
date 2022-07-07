import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-inventory',
  templateUrl: './main-inventory.component.html',
  styleUrls: ['./main-inventory.component.css'],
})
export class MainInventoryComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  isExpanded = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.drawer.toggle();
    this.cdr.detectChanges();
  }
}
