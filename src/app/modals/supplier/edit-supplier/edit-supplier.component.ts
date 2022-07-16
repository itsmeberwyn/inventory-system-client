import { DataService } from './../../../services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestParams } from 'src/app/models/RequestParams';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css'],
})
export class EditSupplierComponent implements OnInit {
  supplierForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    supplierName: ['', Validators.required],
    contact: ['', Validators.required],
    location: ['', Validators.required],
    created_at: ['', Validators.required],
    is_deleted: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {
    this.supplierForm.setValue({
      id: data.item.id,
      supplierName: data.item.supplierName,
      contact: data.item.contact,
      location: data.item.location,
      created_at: data.item.created_at,
      is_deleted: data.item.is_deleted,
    });
  }

  ngOnInit(): void {}

  editSupplier() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/update-supplier`;
    requestParams.Body = JSON.stringify(this.supplierForm.value);

    this.dataService
      .httpRequest('PATCH', requestParams)
      .subscribe(async (data: any) => {
        if (data.status['remarks'] === 'success') {
          this.data.$suppliers[0][this.data.index] = this.supplierForm.value;

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
          this.supplierForm.reset();
        }
      });
  }
}
