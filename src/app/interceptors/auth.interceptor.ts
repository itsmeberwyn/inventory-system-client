import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_REQUIRED } from '../services/data.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    // check if the request requires authentication
    if (request.context.get(AUTH_REQUIRED)) {
      // Get the auth token from the service.
      const authToken = this.userService.getAccessToken();

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = this.updateHeaders(request, authToken);

      // send cloned request with header to the next handler.
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent || error.status === 401) {
            return this.handleUnauthorizedError(authReq, next);
          }
          return throwError(errorMsg);
        })
      );
    }

    const newReq = this.addCredentials(request);
    return next.handle(newReq);
  }

  addCredentials(request: HttpRequest<any>) {
    return request.clone({ withCredentials: true });
  }

  updateHeaders(request: HttpRequest<any>, token: string) {
    const headers = new HttpHeaders({
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    });

    return request.clone({ headers });
  }

  handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next('');

      return this.userService.refreshAccessToken().pipe(
        switchMap((data: any) => {
          this.userService.updateAccessToken(data.payload['accesstoken']);
          this.tokenSubject.next(data.payload['accesstoken']);

          return next.handle(
            this.updateHeaders(request, data.payload['accesstoken'])
          );
        }),
        catchError((err) => {
          this.userService.logOut();
          this.router.navigate(['/']);
          return throwError(err);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token !== ''),
        take(1),
        switchMap((token) => {
          const authReq = this.updateHeaders(request, token);
          return next.handle(authReq);
        })
      );
    }
  }
}
