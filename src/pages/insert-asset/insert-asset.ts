import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { AssetForm } from '../../forms/assetform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-insert-asset',
  templateUrl: 'insert-asset.html',
})
export class InsertAssetPage {

  public cryptocurrency: Cryptocurrency;
  public wallet: Wallet;
  public allFavorites: Array<Cryptocurrency> = [];
  public assetForm: AssetForm;
  public assetFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.assetForm = new AssetForm();

    this.assetFormGroup = this.formBuilder.group({
      cryptocurrency: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])]
    });
  }

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

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allFavorites(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
        this.allFavorites = result.data;

        loadingOverlay.dismiss();
      }, error => {
        console.error(error);
        this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

        loadingOverlay.dismiss();
    });
  }

  public onSubmit(value: any): void {
    this.registeredUserProvider.insertAsset(this.localStorageProvider.getUserTokenValue(), this.wallet, this.cryptocurrency, this.assetForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}