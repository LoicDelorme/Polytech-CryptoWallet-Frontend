import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

import { HomePage } from '../home/home';
import { AllFavoritesPage } from '../all-favorites/all-favorites';
import { AllWalletsPage } from '../all-wallets/all-wallets';
import { AllAlertsPage } from '../all-alerts/all-alerts';
import { SettingsPage } from '../settings/settings';

import { LocalInformationProvider } from '../../providers/local/information/information';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeRoot:any = HomePage;
  favoritesRoot:any = AllFavoritesPage;
  walletsRoot:any = AllWalletsPage;
  alertsRoot:any = AllAlertsPage;
  settingsRoot:any = SettingsPage;

  constructor(public navCtrl: NavController, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (moment().isAfter(moment(this.localInformationProvider.getUserTokenEndDate(), "DD/MM/YYYY HH:mm:ss"))) {
      this.localInformationProvider.clearAllInformation();
    }
  }
}