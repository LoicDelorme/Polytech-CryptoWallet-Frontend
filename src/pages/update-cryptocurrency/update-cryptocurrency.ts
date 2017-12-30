import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { AllCryptocurrenciesPage } from '../all-cryptocurrencies/all-cryptocurrencies';

@Component({
  selector: 'page-update-cryptocurrency',
  templateUrl: 'update-cryptocurrency.html',
})
export class UpdateCryptocurrencyPage {

  public cryptocurrencyForm: CryptocurrencyForm;
  public cryptocurrencyFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider, public localInformationProvider: LocalInformationProvider) {
    let cryptocurrency: Cryptocurrency = this.navParams.get("cryptocurrency");

    this.cryptocurrencyForm = new CryptocurrencyForm();
    this.cryptocurrencyForm.id = cryptocurrency.id;
    this.cryptocurrencyForm.name = cryptocurrency.name;
    this.cryptocurrencyForm.symbol = cryptocurrency.symbol;
    this.cryptocurrencyForm.imageUrl = cryptocurrency.imageUrl;
    this.cryptocurrencyForm.baseUrl = cryptocurrency.baseUrl;
    this.cryptocurrencyForm.resourceUrl = cryptocurrency.resourceUrl;

    this.cryptocurrencyFormGroup = formBuilder.group({
      name: [cryptocurrency.name, Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: [cryptocurrency.symbol, Validators.compose([Validators.required, Validators.maxLength(250)])],
      imageUrl: [cryptocurrency.imageUrl, Validators.compose([Validators.required, Validators.maxLength(250)])],
      baseUrl: [cryptocurrency.baseUrl, Validators.compose([Validators.required, Validators.maxLength(250)])],
      resourceUrl: [cryptocurrency.resourceUrl, Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AllCryptocurrenciesPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.cryptocurrencyFormGroup.valid) {
      this.administratorCryptocurrencyProvider.updateCryptocurrency(this.localInformationProvider.getUserTokenValue(), this.cryptocurrencyForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(AllCryptocurrenciesPage);
      });
    }
  }
}