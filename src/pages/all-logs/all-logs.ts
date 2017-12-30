import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Log } from '../../entities/log';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewLogPage } from '../overview-log/overview-log';

@Component({
  selector: 'page-all-logs',
  templateUrl: 'all-logs.html',
})
export class AllLogsPage {

  public filteredLogs: Array<Log> = [];
  public allLogs: Array<Log> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AllLogsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allLogs(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allLogs = data.data;
        this.filteredLogs = data.data;
      });
    }
  }

  public onRefreshLogsButtonClicked(): void {
    this.registeredUserProvider.allLogs(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

      this.allLogs = data.data;
      this.filteredLogs = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredLogs = this.allLogs;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredLogs = this.filteredLogs.filter((log: Log) => {
        return log.ipAddress.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewLogButtonClicked(log: Log): void {
    this.navCtrl.push(OverviewLogPage, { log: log });
  }
}