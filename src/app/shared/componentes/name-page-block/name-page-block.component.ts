import { Component, inject, Input, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-name-page-block',
  templateUrl: './name-page-block.component.html',
  styleUrls: ['./name-page-block.component.scss'],
})
export class NamePageBlockComponent implements OnInit {
  private authServise = inject(AuthService);

  @Input() namePage!: string;

  private ngUnsubscribe$ = new Subject<void>();

  currentDate: string | undefined;
  name: string | undefined;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.authServise.user$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
      if (data?.displayName) this.name = data?.displayName;
    });

    const arrDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateNow = new Date();
    const day = dateNow.getDate();
    const dayWeekNumber = dateNow.getDay();
    const dayWeekString = arrDays[dayWeekNumber];
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();

    this.currentDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')} ${dayWeekString}`;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
