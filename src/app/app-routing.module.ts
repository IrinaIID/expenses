import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserIdResolver } from './getUserId';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [UserIdResolver],
    // resolve: {
    //   userId: UserIdResolver
    // },
    children: [
      { path: 'balance',
        loadChildren: () => import('./balance/balance-routing.module').then((m) => m.BalanceRoutingModule),
        canActivate: [AuthGuard] 
      },
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
          canActivate: [AuthGuard]
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics-routing.module').then((m) => m.StatisticsRoutingModule),
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        pathMatch: 'full',
        loadChildren: () => import('./not-found/not-found-routing.module').then((m) => m.NotFoundRoutingModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'exchange-rate'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
