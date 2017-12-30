import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { User } from '../../entities/user';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { UserUpdatePage } from '../user-update/user-update';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-user-overview',
  templateUrl: 'user-overview.html',
})
export class UserOverviewPage {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.user = this.navParams.get("user");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: CryptocurrenciesPage });
    }
  }

  public onUpdateUserButtonClicked(): void {
    this.navCtrl.push(UserUpdatePage, { user: this.user });
  }

  public onDeleteUserButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteUser(this.localInformationProvider.getUserTokenValue(), this.user).subscribe(data => {
              console.warn(data);

              this.localInformationProvider.clearAllInformation();

              this.navCtrl.setRoot(CryptocurrenciesPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}