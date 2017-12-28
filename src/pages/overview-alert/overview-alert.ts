import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Alert } from '../../model/alert';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { UpdateAlertPage } from '../update-alert/update-alert';
import { AlertsPage } from '../alerts/alerts';

@Component({
  selector: 'page-overview-alert',
  templateUrl: 'overview-alert.html',
})
export class OverviewAlertPage {

  public alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.alert = this.navParams.get("alert");
  }

  public onUpdateAlertButtonClicked(): void {
    this.navCtrl.push(UpdateAlertPage, { alert: this.alert });
  }

  public onDeleteAlertButtonClicked(): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this alert?',
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
            this.registeredUserProvider.deleteAlert(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.alert).subscribe(data => {
              console.warn(data);

              this.navCtrl.setRoot(AlertsPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}