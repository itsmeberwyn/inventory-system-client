import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css'],
})
export class ViewPurchaseComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public $purchases: any) {}

  ngOnInit(): void {}
}
