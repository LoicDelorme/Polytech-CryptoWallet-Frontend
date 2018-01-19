import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Currency } from '../../entities/currency';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateCurrencyPage } from '../update-currency/update-currency';
import { AllCurrenciesPage } from '../all-currencies/all-currencies';

@Component({
  selector: 'page-overview-currency',
  templateUrl: 'overview-currency.html',
})
export class OverviewCurrencyPage {

  public currency: Currency;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.currency = this.navParams.get("currency");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCurrenciesPage });
      return;
    }

    this.currency = this.navParams.get("currency");
  }

  public onUpdateCurrencyButtonClicked(): void {
    this.navCtrl.push(UpdateCurrencyPage, { currency: this.currency });
  }
}