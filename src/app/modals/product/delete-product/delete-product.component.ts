import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deleteProduct() {
    this.progress.start();

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-product`;
    requestParams.Body = JSON.stringify({ productId: this.data.productId });

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
