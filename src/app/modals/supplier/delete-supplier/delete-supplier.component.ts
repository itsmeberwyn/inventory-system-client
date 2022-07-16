import { DataService } from './../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css'],
})
export class DeleteSupplierComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  deleteProduct() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/delete-supplier`;
    requestParams.Body = { supplierId: this.data.supplierId };

    this.dataService
      .httpRequest('PATCH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
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

            this.dialogRef.close({ $suppliers: this.data.$suppliers });
          }
        }
      });
  }
}
