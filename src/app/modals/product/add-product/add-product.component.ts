import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  $categories: any = [];
  category: any = '';

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
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

  addProduct() {
    console.log(this.productForm.value);

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/add-product`;
    requestParams.Body = JSON.stringify(this.productForm.value);

    this.dataService
      .httpRequest('POST', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          this.productForm.reset();
        }
      });
  }
}
