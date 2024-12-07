import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-name-page-block',
  templateUrl: './name-page-block.component.html',
  styleUrls: ['./name-page-block.component.scss'],
})
export class NamePageBlockComponent implements OnInit, OnDestroy {
  private authServise = inject(AuthService);

  @Input() namePage = 'Your Balance';

  private ngUnsubscribe$ = new Subject<void>();

  name: string | undefined;
  today: number = Date.now();

  ngOnInit(): void {
    this.authServise.user$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data) => {
      if (data?.displayName) this.name = data?.displayName;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
