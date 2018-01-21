import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Log } from '../../entities/log';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllLogsPage } from '../all-logs/all-logs';

@Component({
  selector: 'page-overview-log',
  templateUrl: 'overview-log.html',
})
export class OverviewLogPage {

  public log: Log;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.log = this.navParams.get("log");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllLogsPage });
      return;
    }

    this.log = this.navParams.get("log");
  }
}