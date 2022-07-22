import { DataService } from './../../../services/data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestParams } from 'src/app/models/RequestParams';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ProgressBar from '@badrap/bar-of-progress';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  supplierForm: FormGroup = this.formBuilder.group({
    supplierName: ['', Validators.required],
    contact: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public $suppliers: any
  ) {}

  ngOnInit(): void {}

  addSupplier() {
    this.progress.start();

    if (this.supplierForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/add-supplier`;
      requestParams.Body = JSON.stringify(this.supplierForm.value);

      this.dataService
        .httpRequest('POST_REQUIRES_AUTH', requestParams)
        .subscribe(async (data: any) => {
          if (data.status['remarks'] === 'success') {
            setTimeout(() => {
              this.supplierForm.reset();
              Swal.fire('Awesome!', data.status['message'], 'success');
              this.progress.finish();
              this.$suppliers[0].unshift(data.payload);

              this.$suppliers = this.$suppliers
                .flat()
                .reduce((resultArray: any, item: any, index: any) => {
                  const chunkIndex = Math.floor(index / 8);

                  if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                  }

                  resultArray[chunkIndex].push(item);

                  return resultArray;
                }, []);
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
