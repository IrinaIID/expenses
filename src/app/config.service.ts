import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class ConfigService {
  private idUser!: string;

  constructor(private authService: AuthService) {}

  load() {
    return this.authService.user$.toPromise()
      .then(data => {
        if(data?.uid) {
          this.idUser = data?.uid;
        }
      });
  }

  getConfig(): string {
    return this.idUser;
  }
}