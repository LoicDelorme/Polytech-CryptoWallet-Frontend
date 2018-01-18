import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewWalletPage } from '../overview-wallet/overview-wallet';
import { InsertWalletPage } from '../insert-wallet/insert-wallet';

@Component({
  selector: 'page-all-wallets',
  templateUrl: 'all-wallets.html',
})
export class AllWalletsPage {

  public filtered: Array<Wallet> = [];
  public all: Array<Wallet> = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allWallets(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertWalletButtonClicked(): void {
    this.navCtrl.push(InsertWalletPage);
  }

  public onRefreshWalletsButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((wallet: Wallet) => {
        return wallet.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewWalletButtonClicked(wallet: Wallet): void {
    this.navCtrl.push(OverviewWalletPage, { wallet: wallet });
  }

  public onDeleteWalletButtonClicked(wallet: Wallet): void {
    this.alertCtrl.create({
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
            this.registeredUserProvider.deleteWallet(this.localStorageProvider.getUserTokenValue(), wallet).subscribe(result => {
              this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
              this.refreshData();
            }, error => {
              console.error(error);
              this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
            });
          }
        }
      ]
    }).present();
  }
}