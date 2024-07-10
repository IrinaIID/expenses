import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);

  user$: Observable<User | null> = user(this.firebaseAuth);

  idUser!: string | null;

  uidFireSubj: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  uidFire: Observable<string | undefined> = this.uidFireSubj.asObservable();

  register(name: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((response) =>
      updateProfile(response.user, {
        displayName: name,
      })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise).pipe(tap((data) => this.updateUserId(data.user.uid)));
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise).pipe(tap(() => this.updateUserId(undefined)));
  }

  getUserId(): string | undefined {
    return this.uidFireSubj.getValue();
  }

  updateUserId(value: string | undefined): void {
    this.uidFireSubj.next(value);
  }
}
