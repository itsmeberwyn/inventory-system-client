import { DataService } from './../../../services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  $categories: any = [];
  category: any = '';

  productForm: FormGroup = this.formBuilder.group({
    productId: ['', Validators.required],
    categoryId: ['', Validators.required],
    productName: ['', Validators.required],
    productDescription: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['', Validators.required],
    minQuantity: ['', Validators.required],
    maxQuantity: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.productForm.setValue({
      productId: this.data.id,
      categoryId: this.data.categoryId,
      productName: this.data.productName,
      productDescription: this.data.productDescription,
      price: this.data.price,
      quantity: this.data.quantity,
      minQuantity: this.data.minQuantity,
      maxQuantity: this.data.maxQuantity,
    });

    this.getCategories();
  }

  getCategories() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/get-categories`;

    this.dataService
      .httpRequest('GET', requestParams)
      .subscribe(async (data: any) => {
        this.$categories = data.payload;
      });
  }

  updateProduct() {
    console.log(this.productForm.value);

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/update-product`;
    requestParams.Body = JSON.stringify(this.productForm.value);

    this.dataService
      .httpRequest('PATCH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          this.productForm.reset();
        }
      });
  }
}
