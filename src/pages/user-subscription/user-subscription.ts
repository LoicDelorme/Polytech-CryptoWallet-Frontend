import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { UserForm } from '../../forms/userform';

import { UnregisteredUserProvider } from '../../providers/unregistered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-user-subscription',
  templateUrl: 'user-subscription.html',
})
export class UserSubscriptionPage {

  public userSubscriptionForm: UserForm;
  public userSubscriptionFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredUserProvider: UnregisteredUserProvider) {
    this.userSubscriptionForm = new UserForm();

    this.userSubscriptionFormGroup = formBuilder.group({
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.userSubscriptionFormGroup.valid) {
      this.unregisteredUserProvider.subscribe(this.userSubscriptionForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: CryptocurrenciesPage });
      });
    }
  }
}