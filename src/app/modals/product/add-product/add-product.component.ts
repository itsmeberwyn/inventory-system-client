import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer/';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

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
      .httpRequest('GET_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        this.$categories = JSON.parse(
          JSON.parse(Buffer.from(data['data'], 'base64').toString('ascii'))
        ).payload;
      });
  }

  addProduct() {
    console.log(this.productForm.value);
    this.progress.start();

    if (this.productForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/add-product`;
      requestParams.Body = JSON.stringify(this.productForm.value);

      this.dataService
        .httpRequest('POST_REQUIRES_AUTH', requestParams)
        .subscribe(async (data: any) => {
          if (data.status['remarks'] === 'success') {
            setTimeout(() => {
              this.productForm.reset();
              Swal.fire('Awesome!', data.status['message'], 'success');
              this.progress.finish();
            }, 200);
          }
        });
    } else {
      setTimeout(() => {
        this.progress.finish();
      }, 200);
    }
  }
}
