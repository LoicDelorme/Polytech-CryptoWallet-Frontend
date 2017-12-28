import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Token } from '../../model/token';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-overview-token',
  templateUrl: 'overview-token.html',
})
export class OverviewTokenPage {

  public token: Token;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.token = this.navParams.get("token");
  }

  public onDeleteTokenButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this token?',
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
            this.registeredUserProvider.deleteToken(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.token).subscribe(data => {
              console.warn(data);

              this.navCtrl.setRoot(SettingsPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}