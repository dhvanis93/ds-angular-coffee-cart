import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [OrderComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class OrderModule {}
