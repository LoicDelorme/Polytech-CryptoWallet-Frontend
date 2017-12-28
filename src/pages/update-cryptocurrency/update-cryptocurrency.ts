import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-update-cryptocurrency',
  templateUrl: 'update-cryptocurrency.html',
})
export class UpdateCryptocurrencyPage {

  public cryptocurrency: Cryptocurrency;
  public cryptocurrencyForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {
    this.cryptocurrency = this.navParams.get("cryprocurrency");
    this.cryptocurrencyForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      imageUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      baseUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      resourceUrl: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.cryptocurrencyForm.valid) {
      this.cryptocurrency.name = value.name;
      this.cryptocurrency.symbol = value.symbol;
      this.cryptocurrency.imageUrl = value.imageUrl;
      this.cryptocurrency.baseUrl = value.baseUrl;
      this.cryptocurrency.resourceUrl = value.resourceUrl;

      this.administratorCryptocurrencyProvider.updateCryptocurrency(window.localStorage.getItem("user.token.value"), this.cryptocurrency).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(CryptocurrenciesPage);
      });
    }
  }
}