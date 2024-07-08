import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  user!: boolean;

  canActivate(): boolean {
    this.authService.getUser().subscribe(data => this.user = !!data?.uid);
    return this.user
  }
  
}
