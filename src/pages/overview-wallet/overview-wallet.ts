import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';

import { LocalStorageProvider } from '../../providers/storage/localstorage';

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

  constructor(private navCtrl: NavController, private navParams: NavParams, private localStorageProvider: LocalStorageProvider) {
    this.wallet = this.navParams.get("wallet");
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }

    this.wallet = this.navParams.get("wallet");
  }

  public onUpdateWalletButtonClicked(): void {
    this.navCtrl.push(UpdateWalletPage, { wallet: this.wallet });
  }

  public onOverviewAssetsButtonClicked(): void {
    this.navCtrl.push(AllAssetsPage, { wallet: this.wallet });
  }
}