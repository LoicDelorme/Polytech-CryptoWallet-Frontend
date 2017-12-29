import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { Cryptocurrency } from '../../model/cryptocurrency';
import { Asset } from '../../model/asset';
import { AssetForm } from '../../forms/assetform';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-update-asset',
  templateUrl: 'update-asset.html',
})
export class UpdateAssetPage {

  public wallet: Wallet;
  public cryptocurrency: Cryptocurrency;
  public assetForm: AssetForm;
  public assetFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider) {
    let asset: Asset = this.navParams.get("asset");

    this.assetForm = new AssetForm();
    this.assetForm.amount = asset.amount;
    this.assetForm.purchasePrice = asset.purchasePrice;

    this.assetFormGroup = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])]
    });
  }

  public ionViewDidEnter(): void {
    let asset: Asset = this.navParams.get("asset");

    this.registeredUserProvider.getWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), asset.walletId).subscribe(data => {
      console.warn(data);

      this.wallet = data.data;
    });

    this.unregisteredCryptocurrencyProvider.getCryptocurrency(asset.cryptocurrency.id).subscribe(data => {
      console.warn(data);

      this.cryptocurrency = data.data;
    });
  }

  public onSubmit(value: any): void {
    if (this.assetFormGroup.valid) {
      this.registeredUserProvider.updateAsset(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet, this.cryptocurrency, this.assetForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}