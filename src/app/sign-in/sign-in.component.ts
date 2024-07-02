import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  isSignIn: boolean = true;

  toggleForm() {
    this.isSignIn = !this.isSignIn
  }


}
