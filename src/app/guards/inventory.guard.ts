import { RouteListenerService } from './../services/route-listener.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryGuard implements CanActivate {
  constructor(
    private router: Router,
    private _userService: UserService,
    private routeListenerService: RouteListenerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this._userService.getLoginState() &&
      JSON.parse(localStorage.getItem('user') || '')?.role === 'inventory'
    ) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
