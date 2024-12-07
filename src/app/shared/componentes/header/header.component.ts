import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);

  user$: Observable<User | null> = this.authService.user$;

  logout(): void {
    this.authService.logout();
  }
}
