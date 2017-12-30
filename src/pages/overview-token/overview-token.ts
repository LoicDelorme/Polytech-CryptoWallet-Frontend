import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Token } from '../../entities/token';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllTokensPage } from '../all-tokens/all-tokens';

@Component({
  selector: 'page-overview-token',
  templateUrl: 'overview-token.html',
})
export class OverviewTokenPage {

  public token: Token;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
    this.token = this.navParams.get("token");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllTokensPage });
    }
  }
}