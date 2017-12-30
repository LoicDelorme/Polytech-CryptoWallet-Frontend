import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AllFavoritesPage } from '../all-favorites/all-favorites';
import { AllWalletsPage } from '../all-wallets/all-wallets';
import { AllAlertsPage } from '../all-alerts/all-alerts';
import { AllSettingsPage } from '../all-settings/all-settings';

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
  settingsRoot:any = AllSettingsPage;

  constructor(public navCtrl: NavController, public localInformationProvider: LocalInformationProvider) {
    this.localInformationProvider.clearAllInformation(); // TO REMOVE
  }
}