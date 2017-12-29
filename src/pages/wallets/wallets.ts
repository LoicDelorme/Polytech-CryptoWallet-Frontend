import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewWalletPage } from '../overview-wallet/overview-wallet';
import { InsertWalletPage } from '../insert-wallet/insert-wallet';

@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  public isRegistered: boolean = null;
  public filteredWallets: Array<Wallet> = [];
  public allWallets: Array<Wallet> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: WalletsPage });
    } else {
      this.registeredUserProvider.allWallets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
        this.allWallets = data.data;
        this.filteredWallets = data.data;
      });
    }
  }

  public onInsertWalletButtonClicked(): void {
    this.navCtrl.push(InsertWalletPage);
  }

  public onRefreshWalletsButtonClicked(): void {
    this.registeredUserProvider.allWallets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allWallets = data.data;
      this.filteredWallets = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredWallets = this.allWallets;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredWallets = this.filteredWallets.filter((wallet: Wallet) => {
        return wallet.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewWalletButtonClicked(wallet: Wallet): void {
    this.navCtrl.push(OverviewWalletPage, { wallet: wallet });
  }
}