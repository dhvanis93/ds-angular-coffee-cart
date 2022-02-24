import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; choice: string }
  ) {}
  @ViewChild('yesButton') buttton: MatButton;
  buttonEl: HTMLElement;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.data.choice === 'yes')
      this.buttton._elementRef.nativeElement.setAttribute(
        'cdkFocusInitial',
        ''
      );
  }
}
