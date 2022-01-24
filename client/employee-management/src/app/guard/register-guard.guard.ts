import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RegisterService } from 'app/register/register.service';
import { JwtToken } from 'app/register/jwtToken';

import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private registerService: RegisterService) {}
  accept: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let tokenString = route.paramMap.get('token');
    let jwt =
      tokenString == null ? new JwtToken('') : new JwtToken(tokenString);

    const result = new Subject<boolean>();

    this.registerService.validateToken(jwt).subscribe(
      (res) => {
        console.log(res.jwt);
        result.next(true);
        result.complete();
      },
      (err) => {
        console.log(err.error);
        result.next(false);
        alert('Link exprired!');
        result.complete();
      }
    );

    return result.asObservable();
  }
}
