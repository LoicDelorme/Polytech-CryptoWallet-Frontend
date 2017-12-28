import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Setting } from '../../model/setting';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { UpdateSettingPage } from '../update-setting/update-setting';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-overview-setting',
  templateUrl: 'overview-setting.html',
})
export class OverviewSettingPage {

  public setting: Setting;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.setting = this.navParams.get("setting");
  }

  public onUpdateSettingButtonClicked(): void {
    this.navCtrl.push(UpdateSettingPage, { setting: this.setting });
  }

  public onDeleteSettingButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this setting?',
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
            this.registeredUserProvider.deleteSetting(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.setting).subscribe(data => {
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