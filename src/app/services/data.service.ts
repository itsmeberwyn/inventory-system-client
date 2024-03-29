import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestParams } from '../models/RequestParams';
import { environment } from 'src/environments/environment';

import { Buffer } from 'buffer/';

export const AUTH_REQUIRED = new HttpContextToken(() => true);

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private baseURL = environment.apiURL;

  httpRequest(requestType: string, requestParams: RequestParams) {
    let result: any;

    switch (requestType) {
      //get data
      case 'GET':
        result = this.http.get(`${this.baseURL}${requestParams.EndPoint}`, {
          context: new HttpContext().set(AUTH_REQUIRED, false),
        });
        break;

      //post data
      case 'POST':
        result = this.http.post(
          `${this.baseURL}${requestParams.EndPoint}`,
          Buffer.from(requestParams.Body).toString('base64'),
          { context: new HttpContext().set(AUTH_REQUIRED, false) }
        );
        break;

      //put data
      case 'PATCH':
        result = this.http.patch(
          `${this.baseURL}${requestParams.EndPoint}`,
          Buffer.from(requestParams.Body).toString('base64'),
          {
            context: new HttpContext().set(AUTH_REQUIRED, false),
          }
        );
        break;

      //get data requires authentication
      case 'GET_REQUIRES_AUTH':
        result = this.http.get(`${this.baseURL}${requestParams.EndPoint}`, {
          context: new HttpContext().set(AUTH_REQUIRED, true),
        });
        break;

      case 'POST_REQUIRES_AUTH':
        result = this.http.post(
          `${this.baseURL}${requestParams.EndPoint}`,
          Buffer.from(requestParams.Body).toString('base64'),
          { context: new HttpContext().set(AUTH_REQUIRED, true) }
        );
        break;

      case 'PATCH_REQUIRES_AUTH':
        result = this.http.patch(
          `${this.baseURL}${requestParams.EndPoint}`,
          Buffer.from(requestParams.Body).toString('base64'),
          {
            context: new HttpContext().set(AUTH_REQUIRED, true),
          }
        );
        break;

      default:
        break;
    }

    return result;
  }

  public handleError(error: HttpErrorResponse) {
    alert(error.message);
  }
}
