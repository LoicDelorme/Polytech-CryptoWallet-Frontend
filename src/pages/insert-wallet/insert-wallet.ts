import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';
import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-insert-wallet',
  templateUrl: 'insert-wallet.html',
})
export class InsertWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.walletForm = new WalletForm();
    this.walletFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.walletFormGroup.valid) {
      this.walletForm.userId = parseInt(window.localStorage.getItem("user.id"));
      this.registeredUserProvider.insertWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.walletForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}