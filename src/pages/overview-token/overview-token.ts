import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Token } from '../../entities/token';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllTokensPage } from '../all-tokens/all-tokens';

@Component({
  selector: 'page-overview-token',
  templateUrl: 'overview-token.html',
})
export class OverviewTokenPage {

  public token: Token;

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.token = this.navParams.get("token");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllTokensPage });
      return;
    }

    this.token = this.navParams.get("token");
  }
}