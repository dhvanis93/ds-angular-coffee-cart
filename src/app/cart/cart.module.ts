import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class CartModule {}
