import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private fireBaseService = inject(TransactionFirebaseService);

  isAuth = false;

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => this.isAuth = !!data?.uid);
  }

  logout(): void {
    this.authService.logout();
  }
}
