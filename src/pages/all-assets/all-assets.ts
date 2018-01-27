import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController, ItemSliding } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { Asset } from '../../entities/asset';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { CoinMarketCapProvider } from '../../providers/coinmarketcap/coinmarketcap';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { InsertAssetPage } from '../insert-asset/insert-asset';
import { UpdateAssetPage } from '../update-asset/update-asset';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-all-assets',
  templateUrl: 'all-assets.html',
})
export class AllAssetsPage {

  public wallet: Wallet;
  public filtered: Array<Asset> = [];
  public all: Array<Asset> = [];
  public purchasePrice: number = 0;
  public currentPrice: number = 0;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private registeredUserProvider: RegisteredUserProvider, private coinMarketCapProvider: CoinMarketCapProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }

    this.wallet = this.navParams.get("wallet");
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    this.purchasePrice = 0;
    this.currentPrice = 0;

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allAssets(this.localStorageProvider.getUserTokenValue(), this.wallet).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      for (let offset = 0; offset < this.all.length; offset++) {
        let asset: Asset = this.all[offset];
        this.purchasePrice = this.purchasePrice + asset.purchasePrice;

        this.coinMarketCapProvider.getCurrentPrice(asset.cryptocurrency).subscribe(result => {
          this.currentPrice = this.currentPrice + (asset.amount * result.data.priceBtc);
        }, error => {
          console.error(error);
          this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
        });
      }

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertAssetButtonClicked(): void {
    this.navCtrl.push(InsertAssetPage, { wallet: this.wallet });
  }

  public onRefreshAssetsButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((asset: Asset) => {
        return (asset.cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (asset.cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onUpdateAssetButtonClicked(asset: Asset, slidingItem: ItemSliding): void {
    slidingItem.close();

    this.navCtrl.push(UpdateAssetPage, { wallet: this.wallet, asset: asset });
  }

  public onDeleteAssetButtonClicked(asset: Asset): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this asset?',
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
            this.registeredUserProvider.deleteAsset(this.localStorageProvider.getUserTokenValue(), this.wallet, asset.cryptocurrency).subscribe(result => {
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