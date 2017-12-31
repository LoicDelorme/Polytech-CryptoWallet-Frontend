import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { Asset } from '../../entities/asset';
import { AssetForm } from '../../forms/assetform';

import { UnregisteredCryptocurrencyProvider } from '../../providers/unregistered/cryptocurrency/cryptocurrency';
import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-update-asset',
  templateUrl: 'update-asset.html',
})
export class UpdateAssetPage {

  public wallet: Wallet;
  public cryptocurrency: Cryptocurrency;
  public assetForm: AssetForm;
  public assetFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public unregisteredCryptocurrencyProvider: UnregisteredCryptocurrencyProvider, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    let asset: Asset = this.navParams.get("asset");
    let wallet: Wallet = this.navParams.get("wallet");

    this.cryptocurrency = asset.cryptocurrency;
    this.wallet = wallet;

    this.assetForm = new AssetForm();
    this.assetForm.amount = asset.amount;
    this.assetForm.purchasePrice = asset.purchasePrice;

    this.assetFormGroup = formBuilder.group({
      amount: [asset.amount, Validators.compose([Validators.required])],
      purchasePrice: [asset.purchasePrice, Validators.compose([Validators.required])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.assetFormGroup.valid) {
      this.registeredUserProvider.updateAsset(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.wallet, this.cryptocurrency, this.assetForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.pop();
      });
    }
  }
}