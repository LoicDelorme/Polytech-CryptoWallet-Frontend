import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

@Component({
  selector: 'page-overview-wallet',
  templateUrl: 'overview-wallet.html',
})
export class OverviewWalletPage {

  public wallet: Wallet;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.wallet = this.navParams.get("wallet");
  }
}