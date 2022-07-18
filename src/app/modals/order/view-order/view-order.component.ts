import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public $orders: any) {}

  ngOnInit(): void {}
}
