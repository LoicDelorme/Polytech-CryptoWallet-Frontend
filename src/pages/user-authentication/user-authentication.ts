import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Token } from '../../entities/token';
import { AuthenticationForm } from '../../forms/authenticationform';

import { UnregisteredUserProvider } from '../../providers/unregistered/user/user';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

@Component({
  selector: 'page-user-authentication',
  templateUrl: 'user-authentication.html',
})
export class UserAuthenticationPage {

  public userAuthenticationForm: AuthenticationForm;
  public userAuthenticationFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredUserProvider: UnregisteredUserProvider, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.userAuthenticationForm = new AuthenticationForm();

    this.userAuthenticationFormGroup = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.userAuthenticationFormGroup.valid) {
      this.unregisteredUserProvider.authenticate(this.userAuthenticationForm).subscribe(data => {
        console.warn(data);

        this.localInformationProvider.saveTokenInformation(data.data);

        this.registeredUserProvider.getUser(data.data.value, data.data.userId).subscribe(data => {
          console.warn(data);

          this.localInformationProvider.saveUserInformation(data.data);

          this.navCtrl.setRoot(this.navParams.get("onSuccessRedirect"));
        });
      });
    }
  }
}