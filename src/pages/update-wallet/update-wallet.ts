import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-update-wallet',
  templateUrl: 'update-wallet.html',
})
export class UpdateWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    let wallet: Wallet = this.navParams.get("wallet");

    this.walletForm = new WalletForm();
    this.walletForm.id = wallet.id;
    this.walletForm.name = wallet.name;
    this.walletForm.userId = wallet.userId;

    this.walletFormGroup = formBuilder.group({
      name: [wallet.name, Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.walletFormGroup.valid) {
      this.registeredUserProvider.updateWallet(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.walletForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.getPrevious().data.wallet = data.data;
        this.navCtrl.pop();
      });
    }
  }
}