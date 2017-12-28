import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { UpdateWalletPage } from '../update-wallet/update-wallet';
import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-overview-wallet',
  templateUrl: 'overview-wallet.html',
})
export class OverviewWalletPage {

  public wallet: Wallet;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.wallet = this.navParams.get("wallet");
  }

  public onUpdateWalletButtonClicked(): void {
    this.navCtrl.push(UpdateWalletPage, { wallet: this.wallet });
  }

  public onDeleteWalletButtonClicked(): void {
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
            this.registeredUserProvider.deleteWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet).subscribe(data => {
              console.warn(data);

              this.navCtrl.setRoot(WalletsPage);
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}