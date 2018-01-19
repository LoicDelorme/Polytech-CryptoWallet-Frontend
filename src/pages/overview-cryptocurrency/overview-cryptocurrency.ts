import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';

@Component({
  selector: 'page-overview-cryptocurrency',
  templateUrl: 'overview-cryptocurrency.html',
})
export class OverviewCryptocurrencyPage {

  public cryptocurrency: Cryptocurrency;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
      return;
    }

    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public onUpdateCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: this.cryptocurrency });
  }
}