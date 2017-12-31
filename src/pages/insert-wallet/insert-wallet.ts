import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-insert-wallet',
  templateUrl: 'insert-wallet.html',
})
export class InsertWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.walletForm = new WalletForm();
    this.walletForm.userId = this.localInformationProvider.getUserId();

    this.walletFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.walletFormGroup.valid) {
      this.registeredUserProvider.insertWallet(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.walletForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.pop();
      });
    }
  }
}