import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AlertType } from '../../model/alerttype';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';

import { UpdateAlertTypePage } from '../update-alerttype/update-alerttype';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-overview-alerttype',
  templateUrl: 'overview-alerttype.html',
})
export class OverviewAlertTypePage {

  public alertType: AlertType;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public administratorAlertTypeProvider: AdministratorAlertTypeProvider) {
    this.alertType = this.navParams.get("alertType");
  }

  public onUpdateAlertTypeButtonClicked(): void {
    this.navCtrl.push(UpdateAlertTypePage, { alertType: this.alertType });
  }

  public onDeleteAlertTypeButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this alert type?',
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
            this.administratorAlertTypeProvider.deleteAlertType(window.localStorage.getItem("user.token.value"), this.alertType).subscribe(data => {
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