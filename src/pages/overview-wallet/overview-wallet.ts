import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { UpdateWalletPage } from '../update-wallet/update-wallet';

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
}