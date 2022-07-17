import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RequestParams } from '../models/RequestParams';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-salesreport',
  templateUrl: './login-salesreport.component.html',
  styleUrls: ['./login-salesreport.component.css'],
})
export class LoginSalesreportComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['salesreport', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginSubmit() {
    if (this.loginForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/admin-login`;
      requestParams.Body = JSON.stringify(this.loginForm.value);

      this.dataService.httpRequest('POST', requestParams).subscribe(
        (data: any) => {
          this.userService.setAccessToken(data.payload['access_token']);
          this.router.navigate(['/pointofsale']);
        },
        (error: any) => {
          Swal.fire('Failed!', error['error']['status'].message, 'error');
        }
      );
    }
  }
}
