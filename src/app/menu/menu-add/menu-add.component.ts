import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css'],
})
export class MenuAddComponent implements OnInit {
  menuAddForm: FormGroup;
  menu: { name: string; price: number; ingredients: [] };
  constructor(public dialoRef: MatDialogRef<MenuAddComponent>) {}

  ngOnInit(): void {
    this.initForm();
    this.menu = {
      name: '',
      price: 0,
      ingredients: [],
    };
  }
  initForm() {
    this.menuAddForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      ingredients: new FormArray([]),
    });
  }
  getIngredients() {
    return (<FormArray>this.menuAddForm.get('ingredients')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.menuAddForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ]),
      })
    );
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.menuAddForm.get('ingredients')).removeAt(index);
  }
  getMenu() {
    this.menu.name = this.menuAddForm.get('name').value;
    this.menu.price = this.menuAddForm.get('price').value;
    this.menu.ingredients = this.menuAddForm.get('ingredients').value;
    // console.log(this.menu);
    this.dialoRef.close(this.menu);
    return this.menu;
  }
}
