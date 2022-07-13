import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
}
}
