import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestParams } from '../models/RequestParams';

@Component({
  selector: 'app-login-inventory',
  templateUrl: './login-inventory.component.html',
  styleUrls: ['./login-inventory.component.css'],
})
export class LoginInventoryComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginSubmit() {
    console.log(this.loginForm.value);

    const requestParams = new RequestParams();
    requestParams.EndPoint = `/admin-login`;
    requestParams.Body = JSON.stringify(this.loginForm.value);

    this.dataService
      .httpRequest('POST', requestParams)
      .subscribe(async (data: any) => {
        console.log(data);
        this.userService.setAccessToken(data.payload['access_token']);
        this.router.navigate(['/inventory']);
      });
  }
}
