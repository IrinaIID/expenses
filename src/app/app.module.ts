import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth, Auth, user } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { SignInModule } from './sign-in/sign-in.module';
import { BalanceModule } from './balance/balance.module';
import { AddTransactionModule } from './add-transaction/add-transaction.module';
import { AuthGuard } from './auth.guard';
import { StatisticsModule } from './statistics/statistics.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AddTransactionModule,
    ExchangeRateModule,
    SignInModule,
    BalanceModule,
    StatisticsModule,
  ],
  providers: [
    AuthGuard,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: getUserId,
    //   multi: true,
    //   deps: [Auth],
    // },
 ],
  bootstrap: [AppComponent],
})
export class AppModule {}
