import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Currency } from '../../entities/currency';
import { CurrencyForm } from '../../forms/currencyform';

import { AdministratorCurrencyProvider } from '../../providers/administrator/currency';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllCurrenciesPage } from '../all-currencies/all-currencies';

@Component({
  selector: 'page-update-currency',
  templateUrl: 'update-currency.html',
})
export class UpdateCurrencyPage {

  public currencyForm: CurrencyForm;
  public currencyFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorCurrencyProvider: AdministratorCurrencyProvider, private localStorageProvider: LocalStorageProvider) {
    this.currencyForm = new CurrencyForm();

    this.currencyFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(3)])]
    });

    let currency: Currency = this.navParams.get("currency");
    this.currencyForm.id = currency.id;
    this.currencyForm.name = currency.name;
    this.currencyForm.symbol = currency.symbol;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCurrenciesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorCurrencyProvider.updateCurrency(this.localStorageProvider.getUserTokenValue(), this.currencyForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.getPrevious().data.currency = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}