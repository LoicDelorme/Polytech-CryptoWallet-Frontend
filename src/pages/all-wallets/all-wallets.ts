import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewWalletPage } from '../overview-wallet/overview-wallet';
import { InsertWalletPage } from '../insert-wallet/insert-wallet';

@Component({
  selector: 'page-all-wallets',
  templateUrl: 'all-wallets.html',
})
export class AllWalletsPage {

  public filteredWallets: Array<Wallet> = [];
  public allWallets: Array<Wallet> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allWallets(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allWallets = data.data;
        this.filteredWallets = data.data;
      });
    }
  }

  public onInsertWalletButtonClicked(): void {
    this.navCtrl.push(InsertWalletPage);
  }

  public onRefreshWalletsButtonClicked(): void {
    this.registeredUserProvider.allWallets(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

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
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteWallet(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), wallet).subscribe(data => {
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