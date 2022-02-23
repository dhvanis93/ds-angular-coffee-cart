import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
