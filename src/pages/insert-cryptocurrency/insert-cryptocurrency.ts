import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';

@Component({
  selector: 'page-insert-cryptocurrency',
  templateUrl: 'insert-cryptocurrency.html',
})
export class InsertCryptocurrencyPage {

  public cryptocurrencyForm: CryptocurrencyForm;
  public cryptocurrencyFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider, public localInformationProvider: LocalInformationProvider) {
    this.cryptocurrencyForm = new CryptocurrencyForm();

    this.cryptocurrencyFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      baseUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      resourceUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.cryptocurrencyFormGroup.valid) {
      this.administratorCryptocurrencyProvider.insertCryptocurrency(this.localInformationProvider.getUserTokenValue(), this.cryptocurrencyForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AllCryptocurrenciesPage);
      });
    }
  }
}