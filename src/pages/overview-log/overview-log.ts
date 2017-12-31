import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Log } from '../../entities/log';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllLogsPage } from '../all-logs/all-logs';

@Component({
  selector: 'page-overview-log',
  templateUrl: 'overview-log.html',
})
export class OverviewLogPage {

  public log: Log;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.log = this.navParams.get("log");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllLogsPage });
    } else {
      this.log = this.navParams.get("log");
    }
  }
}