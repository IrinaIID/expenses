import { Component, inject, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/auth.service';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService);
  fireBaseService = inject(TransactionFirebaseService);

  isAuth = false;

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => this.isAuth = !!data?.uid);
  }

  logout(): void {
    this.authService.getUser().subscribe(data => console.log(data?.email))
    this.authService.logout();
  }
}
