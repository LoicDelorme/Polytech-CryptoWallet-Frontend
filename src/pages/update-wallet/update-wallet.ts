import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-update-wallet',
  templateUrl: 'update-wallet.html',
})
export class UpdateWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    let wallet: Wallet = this.navParams.get("wallet");

    this.walletForm = new WalletForm();
    this.walletForm.id = wallet.id;
    this.walletForm.name = wallet.name;
    this.walletForm.userId = wallet.userId;

    this.walletFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.walletFormGroup.valid) {
      this.registeredUserProvider.updateWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.walletForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}