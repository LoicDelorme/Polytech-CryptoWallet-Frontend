import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { UpdateWalletPage } from '../update-wallet/update-wallet';
import { AssetsPage } from '../assets/assets';

@Component({
  selector: 'page-overview-wallet',
  templateUrl: 'overview-wallet.html',
})
export class OverviewWalletPage {

  public wallet: Wallet;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.wallet = this.navParams.get("wallet");
  }

  public onUpdateWalletButtonClicked(): void {
    this.navCtrl.push(UpdateWalletPage, { wallet: this.wallet });
  }

  public onOverviewAssetsButtonClicked(): void {
    this.navCtrl.push(AssetsPage, { wallet: this.wallet });
  }
}