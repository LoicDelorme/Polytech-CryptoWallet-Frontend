import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { Asset } from '../../model/asset';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { AuthenticationPage } from '../authentication/authentication';
import { InsertAssetPage } from '../insert-asset/insert-asset';
import { UpdateAssetPage } from '../update-asset/update-asset';

@Component({
  selector: 'page-assets',
  templateUrl: 'assets.html',
})
export class AssetsPage {

  public isRegistered: boolean = null;
  public wallet: Wallet;
  public filteredAssets: Array<Asset> = [];
  public allAssets: Array<Asset> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider) {
    this.wallet = this.navParams.get("wallet");
  }

  public ionViewWillEnter(): void {
    this.isRegistered = (window.localStorage.getItem("user") === "true");
    if (!this.isRegistered) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AssetsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.isRegistered) {
      this.registeredUserProvider.allAssets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet).subscribe(data => {
        this.allAssets = data.data;
        this.filteredAssets = data.data;
      });
    }
  }

  public onInsertAssetButtonClicked(): void {
    this.navCtrl.push(InsertAssetPage, { wallet: this.wallet });
  }

  public onRefreshAssetsButtonClicked(): void {
    this.registeredUserProvider.allAssets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet).subscribe(data => {
      this.allAssets = data.data;
      this.filteredAssets = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredAssets = this.allAssets;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredAssets = this.filteredAssets.filter((asset: Asset) => {
        return (asset.cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (asset.cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onUpdateAssetButtonClicked(asset: Asset): void {
    this.navCtrl.push(UpdateAssetPage, { wallet: this.wallet, asset: asset });
  }

  public onDeleteAssetButtonClicked(asset: Asset): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this asset?',
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
            this.registeredUserProvider.deleteAsset(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet, asset.cryptocurrency).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredAssets.indexOf(asset);
              if (filteredIndex != -1) {
                this.filteredAssets.splice(filteredIndex, 1);
              }

              let allIndex: number = this.allAssets.indexOf(asset);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allAssets.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}