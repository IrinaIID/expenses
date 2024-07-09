import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { Auth, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<any> {
  constructor(private firebaseAuth: Auth, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return user(this.firebaseAuth).pipe(
      tap(
        (user) => this.authService.uidFire =  user?.uid
      )
    );
  }
}
