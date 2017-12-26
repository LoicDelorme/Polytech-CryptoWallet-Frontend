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
    /* TO REMOVE */
    window.localStorage.setItem("user", "true");
    window.localStorage.setItem("user.id", "1");
    window.localStorage.setItem("user.lastname", "DELORME");
    window.localStorage.setItem("user.firstname", "Loïc");
    window.localStorage.setItem("user.email", "loic.delorme@etu.univ-lyon1.fr");
    window.localStorage.setItem("user.password", "loic.delorme");
    window.localStorage.setItem("user.enabled", "true");
    window.localStorage.setItem("user.administrator", "false");
    window.localStorage.setItem("user.token.value", "bdaabbb7-7477-4aef-8854-de0aff42b4ec");
    /* TO REMOVE */
  }
}