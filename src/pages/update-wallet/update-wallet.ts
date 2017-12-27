import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-update-wallet',
  templateUrl: 'update-wallet.html',
})
export class UpdateWalletPage {

  public wallet: Wallet;
  public walletForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.wallet = this.navParams.get("wallet");
    this.walletForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.walletForm.valid) {
      this.wallet.name = value.name;

      this.registeredUserProvider.updateWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.wallet).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}