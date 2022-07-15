import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
}
}
