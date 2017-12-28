import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { Cryptocurrency } from '../../model/cryptocurrency';
import { AssetForm } from '../../forms/assetform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-insert-asset',
  templateUrl: 'insert-asset.html',
})
export class InsertAssetPage {

  public cryptocurrency: Cryptocurrency;
  public wallet: Wallet;
  public allFavorites: Array<Cryptocurrency> = [];
  public allWallets: Array<Wallet> = [];
  public assetForm: AssetForm;
  public assetFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.assetForm = new AssetForm();
    this.assetFormGroup = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])],
      purchasePrice: ['', Validators.compose([Validators.required])],
      cryptocurrency: ['', Validators.compose([Validators.required])],
      wallet: ['', Validators.compose([Validators.required])]
    });
  }

  public ionViewDidEnter(): void {
    this.registeredUserProvider.allFavorites(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allFavorites = data.data;
    });
    this.registeredUserProvider.allWallets(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id"))).subscribe(data => {
      this.allWallets = data.data;
    });
  }

  public onSubmit(value: any): void {
    if (this.assetFormGroup.valid) {
      this.registeredUserProvider.insertAsset(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet, this.cryptocurrency, this.assetForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}