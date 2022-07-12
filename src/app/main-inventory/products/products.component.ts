import { Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }
 
  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
}

}

