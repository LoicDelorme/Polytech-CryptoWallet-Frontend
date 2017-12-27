import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../model/wallet';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-insert-wallet',
  templateUrl: 'insert-wallet.html',
})
export class InsertWalletPage {

  public walletForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.walletForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.walletForm.valid) {
      let wallet: Wallet = new Wallet();
      wallet.name = value.name;
      wallet.userId = parseInt(window.localStorage.getItem("user.id"));

      this.registeredUserProvider.insertWallet(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), wallet).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(WalletsPage);
      });
    }
  }
}