import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable} from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

// @Injectable({ providedIn: 'root' })
// export class UserIdResolver implements Resolve<any> {
//   constructor(private firebaseAuth: Auth, private authService: AuthService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
//     return user(this.firebaseAuth).pipe(
//       tap(
//         (user) => this.authService.updateUserId(user?.uid)
//       )
//     );
//   }
// }

/** 
 * TODO cooment  
 */ 

@Injectable({ providedIn: 'root' })
export class UserIdResolver implements CanActivateChild {
  constructor(
    private firebaseAuth: Auth,
    private authService: AuthService
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return user(this.firebaseAuth).pipe(
      map((user) => {
        this.authService.updateUserId(user?.uid);
        return true;
      })
    );
  }
}
