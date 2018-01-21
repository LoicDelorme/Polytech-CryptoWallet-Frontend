import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';

import { UserForm } from '../../forms/userform';

import { UnregisteredUserProvider } from '../../providers/unregistered/user';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-user-subscription',
  templateUrl: 'user-subscription.html',
})
export class UserSubscriptionPage {

  public userSubscriptionForm: UserForm;
  public userSubscriptionFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private unregisteredUserProvider: UnregisteredUserProvider) {
    this.userSubscriptionForm = new UserForm();

    this.userSubscriptionFormGroup = this.formBuilder.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    this.unregisteredUserProvider.subscribe(this.userSubscriptionForm).subscribe(result => {
      this.toastCtrl.create({ message: 'Your account was successfully created!', duration: 3000, position: 'top' }).present();
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: HomePage });
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}