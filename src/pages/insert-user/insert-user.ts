import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { UserForm } from '../../forms/userform';

import { UnregisteredUserProvider } from '../../providers/unregistered/user/user';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-insert-user',
  templateUrl: 'insert-user.html',
})
export class InsertUserPage {

  public userForm: UserForm;
  public userFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredUserProvider: UnregisteredUserProvider) {
    this.userForm = new UserForm();
    this.userFormGroup = formBuilder.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.userFormGroup.valid) {
      this.unregisteredUserProvider.subscribe(this.userForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(CryptocurrenciesPage);
      });
    }
  }
}