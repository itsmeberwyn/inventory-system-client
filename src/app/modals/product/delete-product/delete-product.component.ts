import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deleteProduct() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-product`;
    requestParams.Body = { productId: this.data.productId };

    this.dataService
      .httpRequest('PATCH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          if (this.data.index > -1) {
            this.data.$products[this.data.page].splice(this.data.index, 1);
          }
        }
      });
  }
}
