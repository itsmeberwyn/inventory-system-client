import { DataService } from './../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';
import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css'],
})
export class DeleteSupplierComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  constructor(
    public dialogRef: MatDialogRef<DeleteSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  deleteProduct() {
    this.progress.start();

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-supplier`;
    requestParams.Body = JSON.stringify({ supplierId: this.data.supplierId });

    this.dataService
      .httpRequest('PATCH_REQUIRES_AUTH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          setTimeout(() => {
            Swal.fire('Awesome!', data.status['message'], 'success');
            this.progress.finish();
            if (this.data.index > -1) {
              this.data.$suppliers[this.data.page].splice(this.data.index, 1);
              this.data.$suppliers = this.data.$suppliers
                .flat()
                .reduce((resultArray: any, item: any, index: any) => {
                  const chunkIndex = Math.floor(index / 8);

                  if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                  }

                  resultArray[chunkIndex].push(item);

                  return resultArray;
                }, []);
            }
            this.dialogRef.close({ $suppliers: this.data.$suppliers });
          }, 200);
        }
      });
  }
}
