import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';
import { CryptocurrencyForm } from '../../forms/cryptocurrencyform';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-update-cryptocurrency',
  templateUrl: 'update-cryptocurrency.html',
})
export class UpdateCryptocurrencyPage {

  public cryptocurrencyForm: CryptocurrencyForm;
  public cryptocurrencyFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {
    let cryptocurrency: Cryptocurrency = this.navParams.get("cryptocurrency");

    this.cryptocurrencyForm = new CryptocurrencyForm();
    this.cryptocurrencyForm.id = cryptocurrency.id;
    this.cryptocurrencyForm.name = cryptocurrency.name;
    this.cryptocurrencyForm.symbol = cryptocurrency.symbol;
    this.cryptocurrencyForm.imageUrl = cryptocurrency.imageUrl;
    this.cryptocurrencyForm.baseUrl = cryptocurrency.baseUrl;
    this.cryptocurrencyForm.resourceUrl = cryptocurrency.resourceUrl;

    this.cryptocurrencyFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      baseUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      resourceUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.cryptocurrencyFormGroup.valid) {
      this.administratorCryptocurrencyProvider.updateCryptocurrency(window.localStorage.getItem("user.token.value"), this.cryptocurrencyForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(CryptocurrenciesPage);
      });
    }
  }
}