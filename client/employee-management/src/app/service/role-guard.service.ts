// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
// import { AuthService } from './auth.service';
// import jwt_decode, {JwtPayload} from 'jwt-decode';


// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuardService {

//   constructor(
//     public auth:AuthService,
//     public router:Router,
//   ) { }

//   canActivate(route: ActivatedRouteSnapshot):boolean{
//     const expectedRole = route.data.expectedRole;
//     const token = localStorage.getItem('token');
//     const tokenPayload = jwt_decode<JwtPayload>(token!);
//     if(
//       !this.auth.isAuthenticated() ||
//       tokenPayload.role !== expectedRole
//     ){
//       this.router.navigate(['hr/hire']);
//       return false;
//     }
//     return true;
//   }
// }
