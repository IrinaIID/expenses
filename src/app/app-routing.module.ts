import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: BalanceComponent },
  { path: 'sign-in', component: SignInComponent},
  {
    path: 'exchange-rate',
    loadChildren: () => import('./exchange-rate/exchange-rate.module').then((m) => m.ExchangeRateModule)
  },
  {
    path: 'add-transaction',
    loadChildren: () => import('./add-transaction/add-transaction-routing.module').then((m) => m.AddTransactionRoutingModule)
  },
  {
    path: 'statisrics',
    loadChildren: () => import('./statistics/statistics-routing.module').then((m) => m.StatisticsRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
