import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-page-block',
  templateUrl: './name-page-block.component.html',
  styleUrls: ['./name-page-block.component.scss'],
})
export class NamePageBlockComponent implements OnInit {
  @Input() namePage!: string;
  currentDate: string | undefined;
  name = 'Irina';
  dateCreation = '2024/06/18';

  ngOnInit(): void {

    const arrDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const dateNow = new Date();
    const day = dateNow.getDate();
    const dayWeekNumber = dateNow.getDay();
    const dayWeekString = arrDays[dayWeekNumber];
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    
    this.currentDate = `${year}/${month.toString().padStart(2, '0')}/${day}   ${dayWeekString}`;
  }
}
