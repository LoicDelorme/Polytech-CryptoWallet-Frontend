import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { AuthenticationForm } from '../../forms/authenticationform';

import { UnregisteredUserProvider } from '../../providers/unregistered/user';
import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-user-authentication',
  templateUrl: 'user-authentication.html',
})
export class UserAuthenticationPage {

  public userAuthenticationForm: AuthenticationForm;
  public userAuthenticationFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams,  private toastCtrl: ToastController, private device: Device, private formBuilder: FormBuilder, private unregisteredUserProvider: UnregisteredUserProvider, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.userAuthenticationForm = new AuthenticationForm();

    this.userAuthenticationFormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(250)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    this.userAuthenticationForm.deviceUuid = this.device.uuid;
    this.userAuthenticationForm.devicePlatform = this.device.platform;

    this.unregisteredUserProvider.authenticate(this.userAuthenticationForm).subscribe(result => {
      this.localStorageProvider.saveTokenInformation(result.data);

      this.registeredUserProvider.getUser(result.data.value).subscribe(result => {
        this.localStorageProvider.saveUserInformation(result.data);

        this.registeredUserProvider.allSettings(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
          this.localStorageProvider.saveSettingInformation(result.data);

          let nextPage: any = this.navParams.get("onSuccessRedirect");
          this.navCtrl.setRoot(nextPage != undefined ? nextPage : HomePage);
        }, error => {
          console.error(error);
          this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
        });
      }, error => {
        console.error(error);
        this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
      });
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}