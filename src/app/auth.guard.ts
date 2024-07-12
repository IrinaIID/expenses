import { inject, Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> | boolean {
    return !!this.authService.getUserId();
    // return user(this.firebaseAuth).pipe(map((data) => !!data?.uid));
  }
}
