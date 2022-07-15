import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  $products = [];
  $currentPage = 0;
  productForm: FormGroup = this.formBuilder.group({
    categoryId: ['', Validators.required],
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    minQuantity: ['', Validators.required],
    maxQuantity: ['', Validators.required],
  });

  constructor(
    private dialog: MatDialog,
    private dataServer: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  openAddProductDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  getProducts() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-products-large`;

    this.dataServer
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$products = data.payload;
      });
  }

  addProduct() {}
}
