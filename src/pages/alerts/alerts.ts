import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../model/alert';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewAlertPage } from '../overview-alert/overview-alert';
import { InsertAlertPage } from '../insert-alert/insert-alert';
import { UpdateAlertPage } from '../update-alert/update-alert';

@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  public isRegistered: boolean = null;
  public filteredAlerts: Array<Alert> = [];
  public allAlerts: Array<Alert> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AlertsPage });
    }
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allAlerts(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allAlerts = data.data;
      this.filteredAlerts = data.data;
    });
  }

  public onInsertAlertButtonClicked(): void {
    this.navCtrl.push(InsertAlertPage);
  }

  public onRefreshAlertsButtonClicked(): void {
    this.registeredUserProvider.allAlerts(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
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

  public onAlertOverviewButtonClicked(alert: Alert): void {
    this.navCtrl.push(OverviewAlertPage, { alert: alert });
  }

  public onUpdateAlertButtonClicked(alert: Alert): void {
    this.navCtrl.push(UpdateAlertPage, { alert: alert });
  }

  public onDeleteAlertButtonClicked(alert: Alert): void {
    this.registeredUserProvider.deleteAlert(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), alert).subscribe(data => {
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