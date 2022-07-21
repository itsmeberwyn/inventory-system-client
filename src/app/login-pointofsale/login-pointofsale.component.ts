import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { UserService } from './../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RequestParams } from '../models/RequestParams';
import Swal from 'sweetalert2';
import ProgressBar from '@badrap/bar-of-progress';

@Component({
  selector: 'app-login-pointofsale',
  templateUrl: './login-pointofsale.component.html',
  styleUrls: ['./login-pointofsale.component.css'],
})
export class LoginPointofsaleComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

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

  ngOnInit(): void {
    if (
      this.userService.getLoginState() &&
      JSON.parse(localStorage.getItem('user') || '{}')?.role !== undefined
    ) {
      if (
        JSON.parse(localStorage.getItem('user') || '{}')?.role === 'inventory'
      ) {
        this.router.navigate(['/inventory']);
      } else if (
        JSON.parse(localStorage.getItem('user') || '{}')?.role === 'pointofsale'
      ) {
        this.router.navigate(['/pointofsale']);
      } else if (
        JSON.parse(localStorage.getItem('user') || '{}')?.role === 'salesreport'
      ) {
        this.router.navigate(['/salesreport']);
      }
    } else {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/logout`;
      requestParams.Body = '';

      this.dataService
        .httpRequest('POST', requestParams)
        .subscribe((data: any) => {
          this.userService.logOut();
          this.router.navigate(['/pos-login']);
        });
    }
  }

  loginSubmit() {
    this.progress.start();

    if (this.loginForm.valid) {
      const requestParams = new RequestParams();
      requestParams.EndPoint = `/admin-login`;
      requestParams.Body = JSON.stringify(this.loginForm.value);

      this.dataService.httpRequest('POST', requestParams).subscribe(
        (data: any) => {
          setTimeout(() => {
            this.progress.finish();
            localStorage.setItem(
              'user',
              JSON.stringify({
                id: data.payload['id'],
                name: data.payload['username'],
                role: data.payload['role'],
              })
            );
            this.userService.setAccessToken(data.payload['access_token']);
            this.userService.setLoginState();
            this.router.navigate(['/pointofsale']);
          }, 100);
        },
        (error: any) => {
          setTimeout(() => {
            this.progress.finish();
            Swal.fire('Failed!', error['error']['status'].message, 'error');
          }, 100);
        }
      );
    } else {
      setTimeout(() => {
        this.progress.finish();
        Swal.fire('Failed!', 'Please fill the input field', 'error');
      }, 200);
    }
  }
}
