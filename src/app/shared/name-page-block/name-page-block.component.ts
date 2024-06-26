import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-page-block',
  templateUrl: './name-page-block.component.html',
  styleUrls: ['./name-page-block.component.scss'],
})
export class NamePageBlockComponent implements OnInit {
  @Input() namePage!: string;
  currentDate!: string;
  name = 'Irina';
  dateCreation = '2024/06/18';

  ngOnInit(): void {
    const dateNow = new Date();
    const day = dateNow.getDate();
    const dayWeekNumber = dateNow.getDay();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    let dayWeekString: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun' = 'Sun';

    switch (dayWeekNumber) {
      case 0:
        dayWeekString = 'Sun';
        break;
      case 1:
        dayWeekString = 'Mon';
        break;
      case 2:
        dayWeekString = 'Tue';
        break;
      case 3:
        dayWeekString = 'Wed';
        break;
      case 4:
        dayWeekString = 'Thu';
        break;
      case 5:
        dayWeekString = 'Fri';
        break;
      case 6:
        dayWeekString = 'Sat';
        break;
    }

    this.currentDate = `${year}/${month.toString().padStart(2, '0')}/${day}   ${dayWeekString}`;
  }
}
