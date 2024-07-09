import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(map(user => !!user));
  }
  
}
