import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: {email: string, name: string} | null = null;

  // getUserId(): UserFire | null |number {
  //   return this.user;
  // }

}
