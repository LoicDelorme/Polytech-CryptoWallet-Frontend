import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { ChartPeriod } from '../../entities/chartperiod';

import { AdministratorChartPeriodProvider } from '../../providers/administrator/chartperiod';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewChartPeriodPage } from '../overview-chartperiod/overview-chartperiod';
import { InsertChartPeriodPage } from '../insert-chartperiod/insert-chartperiod';

@Component({
  selector: 'page-all-chartperiods',
  templateUrl: 'all-chartperiods.html',
})
export class AllChartPeriodsPage {

  public filtered: Array<ChartPeriod> = [];
  public all: Array<ChartPeriod> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private administratorChartPeriodProvider: AdministratorChartPeriodProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllChartPeriodsPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.administratorChartPeriodProvider.allChartPeriods(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertChartPeriodButtonClicked(): void {
    this.navCtrl.push(InsertChartPeriodPage);
  }

  public onRefreshChartPeriodsButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((chartPeriod: ChartPeriod) => {
        return chartPeriod.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewChartPeriodButtonClicked(chartPeriod: ChartPeriod): void {
    this.navCtrl.push(OverviewChartPeriodPage, { chartPeriod: chartPeriod });
  }

  public onDeleteChartPeriodButtonClicked(chartPeriod: ChartPeriod): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this chart period?',
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
            this.administratorChartPeriodProvider.deleteChartPeriod(this.localStorageProvider.getUserTokenValue(), chartPeriod).subscribe(result => {
              this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
              this.refreshData();
            }, error => {
              console.error(error);
              this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
            });
          }
        }
      ]
    }).present();
  }
}