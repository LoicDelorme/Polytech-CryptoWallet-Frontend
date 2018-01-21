import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChartPeriod } from '../../entities/chartperiod';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateChartPeriodPage } from '../update-chartperiod/update-chartperiod';
import { AllChartPeriodsPage } from '../all-chartperiods/all-chartperiods';

@Component({
  selector: 'page-overview-chartperiod',
  templateUrl: 'overview-chartperiod.html',
})
export class OverviewChartPeriodPage {

  public chartPeriod: ChartPeriod;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.chartPeriod = this.navParams.get("chartPeriod");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllChartPeriodsPage });
      return;
    }

    this.chartPeriod = this.navParams.get("chartPeriod");
  }

  public onUpdateChartPeriodButtonClicked(): void {
    this.navCtrl.push(UpdateChartPeriodPage, { chartPeriod: this.chartPeriod });
  }
}