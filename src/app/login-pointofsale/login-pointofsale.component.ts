import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { UserService } from './../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from '../models/RequestParams';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-pointofsale',
  templateUrl: './login-pointofsale.component.html',
  styleUrls: ['./login-pointofsale.component.css'],
})
export class LoginPointofsaleComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['pointofsale', Validators.required],
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
