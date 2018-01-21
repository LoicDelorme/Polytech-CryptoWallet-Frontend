import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Wallet } from '../../entities/wallet';
import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-update-wallet',
  templateUrl: 'update-wallet.html',
})
export class UpdateWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.walletForm = new WalletForm();

    this.walletFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });

    let wallet: Wallet = this.navParams.get("wallet");
    this.walletForm.id = wallet.id;
    this.walletForm.name = wallet.name;
    this.walletForm.userId = wallet.userId;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.registeredUserProvider.updateWallet(this.localStorageProvider.getUserTokenValue(), this.walletForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.getPrevious().data.wallet = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}