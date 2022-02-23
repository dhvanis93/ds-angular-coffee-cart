import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, AlertComponent, DialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule,
    DialogComponent,
    MatButtonModule,
  ],
})
export class SharedModule {}
