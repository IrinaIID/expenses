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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
