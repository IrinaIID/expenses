import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  { path: '', component: BalanceComponent },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in-routing.module').then((m) => m.SignInRoutingModule),
  },
  {
    path: 'exchange-rate',
    loadChildren: () => import('./exchange-rate/exchange-rate-routing.module').then((m) => m.ExchangeRateRoutingModule),
  },
  {
    path: 'add-transaction',
    loadChildren: () =>
      import('./add-transaction/add-transaction-routing.module').then((m) => m.AddTransactionRoutingModule),
  },
  {
    path: 'statisrics',
    loadChildren: () => import('./statistics/statistics-routing.module').then((m) => m.StatisticsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
