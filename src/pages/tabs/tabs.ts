import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';
import { FavoritesPage } from '../favorites/favorites';
import { WalletsPage } from '../wallets/wallets';
import { AlertsPage } from '../alerts/alerts';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  cryptocurrenciesRoot:any = CryptocurrenciesPage;
  favoritesRoot:any = FavoritesPage;
  walletsRoot:any = WalletsPage;
  alertsRoot:any = AlertsPage;
  settingsRoot:any = SettingsPage;

  constructor(public navCtrl: NavController) {
    window.localStorage.clear(); // TO REMOVE
  }
}