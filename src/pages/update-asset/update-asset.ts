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

    this.cryptocurrency = this.navParams.get("asset").cryptocurrency;
    this.wallet = this.navParams.get("wallet");

    this.assetForm = new AssetForm();
    this.assetForm.amount = asset.amount;
    this.assetForm.purchasePrice = asset.purchasePrice;

    this.assetFormGroup = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])]
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