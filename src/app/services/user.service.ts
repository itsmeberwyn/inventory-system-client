import { Injectable } from '@angular/core';
import { RequestParams } from '../models/RequestParams';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  public setLoginState() {
    sessionStorage.setItem('login-state', 'true');
  }

  public getLoginState() {
    return sessionStorage.getItem('login-state') == 'true';
  }

  public logOut() {
    sessionStorage.clear();
  }

  public setAccessToken(token: string) {
    sessionStorage.setItem('auth-token', token);
  }

  public updateAccessToken(header: string) {
    sessionStorage.removeItem('auth-token');
    sessionStorage.setItem('auth-token', header);
  }

  //Get access token from web storage
  public getAccessToken() {
    const token: any = sessionStorage.getItem('auth-header');
    return token;
  }

  //Refresh access token using the refresh token
  public refreshAccessToken() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/refreshtoken`;

    return this.dataService.httpRequest('POST', requestParams);
  }
}
