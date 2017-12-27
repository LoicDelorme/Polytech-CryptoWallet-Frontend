import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../model/alert';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { AuthenticationPage } from '../authentication/authentication';

@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  public isRegistered: boolean = null;
  public filteredAlerts: Array<Alert> = [];
  public allAlerts: Array<Alert> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage);
    }

    this.registeredUserProvider.allAlerts(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allAlerts = data.data;
      this.filteredAlerts = data.data;
    });
  }

  public onInsertAlertButtonClicked(): void {
    console.warn("Insert alert button has been clicked");
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
    console.warn("Alert overview button has been clicked for the following alert: " + alert.id);
  }

  public onUpdateAlertButtonClicked(alert: Alert): void {
    console.warn("Update alert button has been clicked for the following alert: " + alert.id);
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