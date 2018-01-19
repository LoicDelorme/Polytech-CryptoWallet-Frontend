import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../entities/alert';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateAlertPage } from '../update-alert/update-alert';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-overview-alert',
  templateUrl: 'overview-alert.html',
})
export class OverviewAlertPage {

  public alert: Alert;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.alert = this.navParams.get("alert");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
      return;
    }

    this.alert = this.navParams.get("alert");
  }

  public onUpdateAlertButtonClicked(): void {
    this.navCtrl.push(UpdateAlertPage, { alert: this.alert });
  }
}