import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Cryptocurrency } from '../../model/cryptocurrency';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';

import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-insert-cryptocurrency',
  templateUrl: 'insert-cryptocurrency.html',
})
export class InsertCryptocurrencyPage {

  public cryptocurrencyForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider) {
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
      let cryptocurrency: Cryptocurrency = new Cryptocurrency();
      cryptocurrency.name = value.name;
      cryptocurrency.symbol = value.symbol;
      cryptocurrency.imageUrl = value.imageUrl;
      cryptocurrency.baseUrl = value.baseUrl;
      cryptocurrency.resourceUrl = value.resourceUrl;

      this.administratorCryptocurrencyProvider.insertCryptocurrency(window.localStorage.getItem("user.token.value"), cryptocurrency).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(CryptocurrenciesPage);
      });
    }
  }
}