import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { UnregisteredUserProvider } from '../../providers/unregistered/user/user';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {

  public authenticationForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredUserProvider: UnregisteredUserProvider) {
    this.authenticationForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.authenticationForm.valid) {
      this.unregisteredUserProvider.authenticate(value.email, value.password).subscribe(data => {
        console.warn(data);

        window.localStorage.setItem("user", JSON.stringify(data.success));
        window.localStorage.setItem("user.id", JSON.stringify(data.data.userId));
        window.localStorage.setItem("user.email", value.email);
        window.localStorage.setItem("user.password", value.password);
        window.localStorage.setItem("user.token.id", JSON.stringify(data.data.id));
        window.localStorage.setItem("user.token.value", data.data.value);
        window.localStorage.setItem("user.token.endDate", JSON.stringify(data.data.endDate));

        this.navCtrl.setRoot(this.navParams.get("onSuccessRedirect"));
      });
    }
  }
}