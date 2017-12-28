import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../model/user';
import { UserForm } from '../../forms/userform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-update-user',
  templateUrl: 'update-user.html',
})
export class UpdateUserPage {

  public userForm: UserForm;
  public userFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    let user: User = this.navParams.get("user");

    this.userForm = new UserForm();
    this.userForm.id = user.id;
    this.userForm.lastname = user.lastname;
    this.userForm.firstname = user.firstname;
    this.userForm.email = user.email;
    this.userForm.password = user.password;
    this.userForm.enabled = user.enabled;
    this.userForm.administrator = user.administrator;

    this.userFormGroup = formBuilder.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.userFormGroup.valid) {
      this.registeredUserProvider.updateUser(localStorage.getItem("user.token.value"),this.userForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(CryptocurrenciesPage);
      });
    }
  }
}