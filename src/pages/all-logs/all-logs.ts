import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Log } from '../../entities/log';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewLogPage } from '../overview-log/overview-log';

@Component({
  selector: 'page-all-logs',
  templateUrl: 'all-logs.html',
})
export class AllLogsPage {

  public filtered: Array<Log> = [];
  public all: Array<Log> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllLogsPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allLogs(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onRefreshLogsButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((log: Log) => {
        return (log.ipAddress.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (log.creationDate.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewLogButtonClicked(log: Log): void {
    this.navCtrl.push(OverviewLogPage, { log: log });
  }
}