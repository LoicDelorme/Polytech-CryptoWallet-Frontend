import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';

import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { UpdateWalletPage } from '../update-wallet/update-wallet';
import { AllWalletsPage } from '../all-wallets/all-wallets';
import { AllAssetsPage } from '../all-assets/all-assets';

@Component({
  selector: 'page-overview-wallet',
  templateUrl: 'overview-wallet.html',
})
export class OverviewWalletPage {

  public wallet: Wallet;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    } else {
      this.wallet = this.navParams.get("wallet");
    }
  }

  public onUpdateWalletButtonClicked(): void {
    this.navCtrl.push(UpdateWalletPage, { wallet: this.wallet });
  }

  public onOverviewAssetsButtonClicked(): void {
    this.navCtrl.push(AllAssetsPage, { wallet: this.wallet });
  }
}