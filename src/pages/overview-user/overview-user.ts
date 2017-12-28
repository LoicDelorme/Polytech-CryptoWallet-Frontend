import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { User } from '../../model/user';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { UpdateUserPage } from '../update-user/update-user';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-overview-user',
  templateUrl: 'overview-user.html',
})
export class OverviewUserPage {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.user = this.navParams.get("user");
  }

  public onUpdateUserButtonClicked(): void {
    this.navCtrl.push(UpdateUserPage, { user: this.user });
  }

  public onDeleteUserButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteUser(window.localStorage.getItem("user.token.value"), this.user).subscribe(data => {
              console.warn(data);
              console.warn("window.localStorage must be clean up!");

              this.navCtrl.setRoot(CryptocurrenciesPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}