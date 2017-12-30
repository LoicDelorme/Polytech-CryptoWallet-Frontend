import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Alert } from '../../entities/alert';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewAlertPage } from '../overview-alert/overview-alert';
import { InsertAlertPage } from '../insert-alert/insert-alert';

@Component({
  selector: 'page-all-alerts',
  templateUrl: 'all-alerts.html',
})
export class AllAlertsPage {

  public filteredAlerts: Array<Alert> = [];
  public allAlerts: Array<Alert> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allAlerts(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allAlerts = data.data;
        this.filteredAlerts = data.data;
      });
    }
  }

  public onInsertAlertButtonClicked(): void {
    this.navCtrl.push(InsertAlertPage);
  }

  public onRefreshAlertsButtonClicked(): void {
    this.registeredUserProvider.allAlerts(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

      this.allAlerts = data.data;
      this.filteredAlerts = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredAlerts = this.allAlerts;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredAlerts = this.filteredAlerts.filter((alert: Alert) => {
        return alert.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewAlertButtonClicked(alert: Alert): void {
    this.navCtrl.push(OverviewAlertPage, { alert: alert });
  }

  public onDeleteAlertButtonClicked(alert: Alert): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this alert?',
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
            this.registeredUserProvider.deleteAlert(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), alert).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredAlerts.indexOf(alert);
              if (filteredIndex != -1) {
                this.filteredAlerts.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allAlerts.indexOf(alert);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allAlerts.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}