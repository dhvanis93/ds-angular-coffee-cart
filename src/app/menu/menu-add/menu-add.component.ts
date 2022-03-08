import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/shared/menu.model';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css'],
})
export class MenuAddComponent implements OnInit {
  menuAddForm: FormGroup;
  menu: { name: string; price: number; ingredients: [] };
  constructor(
    public dialoRef: MatDialogRef<MenuAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; item: Menu }
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.menu = {
      name: '',
      price: null,
      ingredients: [],
    };
  }
  initForm() {
    let name = '',
      price = 1;
    let ingredients = new FormArray([]);
    // console.log(this.data);
    if (this.data.mode === 'edit') {
      name = this.data.item.name;
      price = this.data.item.price;
      for (let item of this.data.item.ingredients) {
        ingredients.push(
          new FormGroup({
            name: new FormControl(item.name, Validators.required),
            quantity: new FormControl(item.quantity, [
              Validators.required,
              Validators.min(1),
              Validators.max(100),
            ]),
          })
        );
      }
    }
    this.menuAddForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      price: new FormControl(price, [Validators.required, Validators.min(1)]),
      ingredients,
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
