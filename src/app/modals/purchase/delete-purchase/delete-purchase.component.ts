import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.css'],
})
export class DeletePurchaseComponent implements OnInit {
  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {}

  deletePurchase() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-purchase`;
    requestParams.Body = { purchaseId: this.data.serialId };

    this.dataService
      .httpRequest('PATCH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
        }
      });
  }
}
