import { Component } from '@angular/core';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {

  isOpenCards = false;
  isOpenStatistics = false;

  toggleMonthCards(): void {
    this.isOpenCards = !this.isOpenCards;
  }

  toggleStatistics(): void {
    this.isOpenStatistics = !this.isOpenStatistics;
  }
}
