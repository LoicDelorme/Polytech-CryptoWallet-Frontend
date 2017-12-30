import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { Asset } from '../../entities/asset';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { InsertAssetPage } from '../insert-asset/insert-asset';
import { UpdateAssetPage } from '../update-asset/update-asset';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-all-assets',
  templateUrl: 'all-assets.html',
})
export class AllAssetsPage {

  public wallet: Wallet;
  public filteredAssets: Array<Asset> = [];
  public allAssets: Array<Asset> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.wallet = this.navParams.get("wallet");
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allAssets(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.wallet).subscribe(data => {
        console.warn(data);

        this.allAssets = data.data;
        this.filteredAssets = data.data;
      });
    }
  }

  public onInsertAssetButtonClicked(): void {
    this.navCtrl.push(InsertAssetPage, { wallet: this.wallet });
  }

  public onRefreshAssetsButtonClicked(): void {
    this.registeredUserProvider.allAssets(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.wallet).subscribe(data => {
      console.warn(data);

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
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.registeredUserProvider.deleteAsset(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.wallet, asset.cryptocurrency).subscribe(data => {
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