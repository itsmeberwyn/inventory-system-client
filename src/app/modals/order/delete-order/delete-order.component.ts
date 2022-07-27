import { DataService } from './../../../services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css'],
})
export class DeleteOrderComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  deletePurchase() {
    this.progress.start();

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-order`;
    requestParams.Body = JSON.stringify({
      orderId: this.data[0].id,
      data: this.data,
    });

    this.dataService
      .httpRequest('PATCH_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          setTimeout(() => {
            Swal.fire('Awesome!', data.status['message'], 'success');
            this.progress.finish();
          }, 200);
        }
      });
  }
}
