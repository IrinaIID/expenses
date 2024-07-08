import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { map, Observable } from 'rxjs';



@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  private authService = inject(AuthService);

  idUser!: Observable<string | undefined>;
  isOpenCards = false;
  isOpenStatistics = false;

  ngOnInit(): void {
    this.idUser = this.authService.user$.pipe(map(user => user?.uid))
   }

  //  setQueries($event: QueryFieldFilterConstraint[]): void {
  //  }

  toggleMonthCards(): void {
    this.isOpenCards = !this.isOpenCards
  }

  toggleStatistics(): void {
    this.isOpenStatistics = !this.isOpenStatistics
  }
}
