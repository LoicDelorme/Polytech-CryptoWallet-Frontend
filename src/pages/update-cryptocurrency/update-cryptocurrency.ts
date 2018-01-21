import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';

@Component({
  selector: 'page-update-cryptocurrency',
  templateUrl: 'update-cryptocurrency.html',
})
export class UpdateCryptocurrencyPage {

  public cryptocurrencyForm: CryptocurrencyForm;
  public cryptocurrencyFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider, private localStorageProvider: LocalStorageProvider) {
    this.cryptocurrencyForm = new CryptocurrencyForm();

    this.cryptocurrencyFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      resourceUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });

    let cryptocurrency: Cryptocurrency = this.navParams.get("cryptocurrency");
    this.cryptocurrencyForm.id = cryptocurrency.id;
    this.cryptocurrencyForm.name = cryptocurrency.name;
    this.cryptocurrencyForm.symbol = cryptocurrency.symbol;
    this.cryptocurrencyForm.imageUrl = cryptocurrency.imageUrl;
    this.cryptocurrencyForm.resourceUrl = cryptocurrency.resourceUrl;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorCryptocurrencyProvider.updateCryptocurrency(this.localStorageProvider.getUserTokenValue(), this.cryptocurrencyForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.getPrevious().data.cryptocurrency = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}