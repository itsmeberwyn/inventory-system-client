import { Injectable } from '@angular/core';
import { RequestParams } from '../models/RequestParams';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  public setLoginState() {
    localStorage.setItem('login-state', 'true');
  }

  public getLoginState() {
    if (
      localStorage.getItem('login-state') == 'true' &&
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user') || '') !== ''
    ) {
      return true;
    }
    return false;
  }

  public isValidRoute(role: string) {
    return JSON.parse(localStorage.getItem('user') || '').role === role;
  }

  public logOut() {
    localStorage.clear();
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
    const token: any = sessionStorage.getItem('auth-token');
    return token;
  }

  //Refresh access token using the refresh token
  public refreshAccessToken() {
    const requestParams = new RequestParams();
    requestParams.EndPoint = `/refreshtoken`;
    requestParams.Body = ``;

    return this.dataService.httpRequest('POST', requestParams);
  }
}
