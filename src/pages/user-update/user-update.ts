import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../entities/user';
import { UserForm } from '../../forms/userform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-user-update',
  templateUrl: 'user-update.html',
})
export class UserUpdatePage {

  public userForm: UserForm;
  public userFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.userForm = new UserForm();

    this.userFormGroup = this.formBuilder.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });

    let user: User = this.navParams.get("user");
    this.userForm.id = user.id;
    this.userForm.lastname = user.lastname;
    this.userForm.firstname = user.firstname;
    this.userForm.email = user.email;
    this.userForm.password = user.password;
    this.userForm.enabled = user.enabled;
    this.userForm.administrator = user.administrator;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: SettingsPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.registeredUserProvider.updateUser(this.localStorageProvider.getUserTokenValue(), this.userForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.localStorageProvider.saveUserInformation(result.data);
      this.navCtrl.getPrevious().data.user = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}