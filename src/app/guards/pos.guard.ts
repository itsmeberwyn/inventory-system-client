import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PosGuard implements CanActivate {
  constructor(private router: Router, private _userService: UserService) {}

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
      JSON.parse(localStorage.getItem('user') || '')?.role === 'pointofsale'
    ) {
      return true;
    } else {
      this.router.navigate(['/pos-login']);
      return false;
    }
  }
}
