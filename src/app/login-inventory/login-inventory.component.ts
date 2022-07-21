import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestParams } from '../models/RequestParams';
import Swal from 'sweetalert2';
import ProgressBar from '@badrap/bar-of-progress';

@Component({
  selector: 'app-login-inventory',
  templateUrl: './login-inventory.component.html',
  styleUrls: ['./login-inventory.component.css'],
})
export class LoginInventoryComponent implements OnInit {
  progress = new ProgressBar({
    size: 4,
    color: '#5464EF',
    className: 'z-50',
    delay: 100,
  });

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['inventory', Validators.required],
  });

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private formBuilder: FormBuilder,
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
          this.router.navigate(['/']);
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
            this.router.navigate(['/inventory']);
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
