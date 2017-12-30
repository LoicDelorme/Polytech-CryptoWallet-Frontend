import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../entities/user';
import { UserForm } from '../../forms/userform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-user-update',
  templateUrl: 'user-update.html',
})
export class UserUpdatePage {

  public userForm: UserForm;
  public userFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
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
      lastname: [user.lastname, Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: [user.firstname, Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: [user.email, Validators.compose([Validators.required, Validators.maxLength(250)])],
      password: [user.password, Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.userFormGroup.valid) {
      this.registeredUserProvider.updateUser(this.localInformationProvider.getUserTokenValue(), this.userForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(HomePage);
      });
    }
  }
}