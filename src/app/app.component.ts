import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'expenses';

  authService = inject(AuthService);
  userService = inject(UserService);

  ngOnInit(): void {
    
    this.authService.getUser().subscribe((user) => {
      if(user) {
        this.userService.user = {
          name: user.displayName!,
          email: user.email!
        }
      } else {
        this.userService.user = null
      }
      console.log(this.userService.user)
    })
  }
}
