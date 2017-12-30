import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../entities/alert';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateAlertPage } from '../update-alert/update-alert';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-overview-alert',
  templateUrl: 'overview-alert.html',
})
export class OverviewAlertPage {

  public alert: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.alert = this.navParams.get("alert");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
    }
  }

  public onUpdateAlertButtonClicked(): void {
    this.navCtrl.push(UpdateAlertPage, { alert: this.alert });
  }
}