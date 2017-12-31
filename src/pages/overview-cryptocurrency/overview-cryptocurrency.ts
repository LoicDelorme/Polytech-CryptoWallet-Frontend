import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { UpdateCryptocurrencyPage } from '../update-cryptocurrency/update-cryptocurrency';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';

@Component({
  selector: 'page-overview-cryptocurrency',
  templateUrl: 'overview-cryptocurrency.html',
})
export class OverviewCryptocurrencyPage {

  public cryptocurrency: Cryptocurrency;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
    } else {
      this.cryptocurrency = this.navParams.get("cryptocurrency");
    }
  }

  public onUpdateCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCryptocurrencyPage, { cryptocurrency: this.cryptocurrency });
  }
}