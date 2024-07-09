import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeroResolver } from './getUserId';

// function getUserId(firebaseAuth: Auth): () => Observable<any> {
//   return () => user(firebaseAuth);
//  }

const routes: Routes = [
  {
    path: '',
    resolve: {
      hero: HeroResolver
    },
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'balance'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
