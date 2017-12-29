import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Log } from '../../model/log';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewLogPage } from '../overview-log/overview-log';

@Component({
  selector: 'page-logs',
  templateUrl: 'logs.html',
})
export class LogsPage {

  public isRegistered: boolean = null;
  public filteredLogs: Array<Log> = [];
  public allLogs: Array<Log> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: LogsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.isRegistered) {
      this.registeredUserProvider.allLogs(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
        this.allLogs = data.data;
        this.filteredLogs = data.data;
      });
    }
  }

  public onRefreshLogsButtonClicked(): void {
    this.registeredUserProvider.allLogs(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
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