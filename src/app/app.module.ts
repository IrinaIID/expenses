import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { SignInModule } from './sign-in/sign-in.module';
import { BalanceModule } from './balance/balance.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddTransactionModule } from './add-transaction/add-transaction.module';
import { AuthGuard } from './auth.guard';
import { StatisticsModule } from './statistics/statistics.module';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ExchangeRateModule,
    SignInModule,
    BalanceModule,
    AddTransactionModule,
    StatisticsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
