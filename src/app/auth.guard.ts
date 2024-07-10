import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);

  canActivate(): Observable<boolean> | boolean {
    return !!this.authService.getUserId();
    // return user(this.firebaseAuth).pipe(map((data) => !!data?.uid));
  }
  
}
