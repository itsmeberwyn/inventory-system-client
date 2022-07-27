import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.css'],
})
export class DeletePurchaseComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  constructor(
    public dialogRef: MatDialogRef<DeletePurchaseComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deletePurchase() {
    this.progress.start();

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-purchase`;
    requestParams.Body = JSON.stringify({
      purchaseId: this.data.serial.purchaseSerialId,
      productId: this.data.serial.productId,
      quantity: this.data.serial.quantityBought,
    });

    this.dataService
      .httpRequest('PATCH_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          setTimeout(() => {
            Swal.fire('Awesome!', data.status['message'], 'success');
            this.progress.finish();

            this.dialogRef.close();
          }, 200);
        }
      });
  }
}
