import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { AuthenticationPage } from '../authentication/authentication';

@Component({
  selector: 'page-wallets',
  templateUrl: 'wallets.html',
})
export class WalletsPage {

  public isRegistered: boolean = null;
  public filteredWallets: Array<Wallet> = [];
  public allWallets: Array<Wallet> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public registeredUserProvider: RegisteredUserProvider) {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.push(AuthenticationPage);
    }

    this.registeredUserProvider.allWallets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allWallets = data.data;
      this.filteredWallets = data.data;
    });
  }

  public onInsertWalletButtonClicked(): void {
    console.warn("Insert wallet button has been clicked");
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

  public onWalletOverviewButtonClicked(wallet: Wallet): void {
    console.warn("Wallet overview button has been clicked for the following wallet: " + wallet.name);
  }

  public onUpdateWalletButtonClicked(wallet: Wallet): void {
    console.warn("Update wallet button has been clicked for the following wallet: " + wallet.name);
  }

  public onDeleteWalletButtonClicked(wallet: Wallet): void {
    this.registeredUserProvider.deleteWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), wallet).subscribe(data => {
      console.warn(data);

      let filteredIndex: number = this.filteredWallets.indexOf(wallet);
      if (filteredIndex != -1) {
        this.filteredWallets.splice(filteredIndex, 1);
      }

      let allIndex: number = this.allWallets.indexOf(wallet);
      if (allIndex != -1 && allIndex != filteredIndex) {
        this.allWallets.splice(allIndex, 1);
      }
    });
  }
}