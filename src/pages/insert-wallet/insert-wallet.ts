import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { WalletForm } from '../../forms/walletform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllWalletsPage } from '../all-wallets/all-wallets';

@Component({
  selector: 'page-insert-wallet',
  templateUrl: 'insert-wallet.html',
})
export class InsertWalletPage {

  public walletForm: WalletForm;
  public walletFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private localStorageProvider: LocalStorageProvider) {
    this.walletForm = new WalletForm();

    this.walletFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllWalletsPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.walletForm.userId = this.localStorageProvider.getUserId();

    this.registeredUserProvider.insertWallet(this.localStorageProvider.getUserTokenValue(), this.walletForm).subscribe(result => {
      let toastOverlay = this.toastCtrl.create({
        message: result.message,
        duration: 3000,
        position: 'top'
      });

      toastOverlay.present();

      this.navCtrl.pop();
    }, error => {
      console.error(error);

      let toastOverlay = this.toastCtrl.create({
        message: 'An error occured...',
        duration: 3000,
        position: 'top'
      });

      toastOverlay.present();
    });
  }
}