import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // constructor(private auth: AuthService, private router: Router) {
  // }

  // canActivate(
  //   // this.router.navigate(['/usuarios']);
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (sessionStorage.getItem('id')!=null) {
  //     return this.router.navigate(['/login']).then(() => false);
  //   }
  //   return true;
  // }
}
