import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { Asset } from '../../entities/asset';
import { AssetForm } from '../../forms/assetform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

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

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.assetForm = new AssetForm();

    this.assetFormGroup = this.formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])]
    });

    let asset: Asset = this.navParams.get("asset");
    let wallet: Wallet = this.navParams.get("wallet");
    this.cryptocurrency = asset.cryptocurrency;
    this.wallet = wallet;
    this.assetForm.amount = asset.amount;
    this.assetForm.purchasePrice = asset.purchasePrice;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.registeredUserProvider.updateAsset(this.localStorageProvider.getUserTokenValue(), this.wallet, this.cryptocurrency, this.assetForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}