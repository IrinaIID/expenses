import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = 28;

  getUserId() {
    return this.userId;
  }
}