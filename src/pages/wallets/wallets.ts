import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: WalletsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.isRegistered) {
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

  public onDeleteWalletButtonClicked(wallet: Wallet): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this wallet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
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
      ]
    });

    confirmationAlert.present();
  }
}