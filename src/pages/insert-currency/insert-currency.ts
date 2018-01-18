import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';

import { CurrencyForm } from '../../forms/currencyform';

import { AdministratorCurrencyProvider } from '../../providers/administrator/currency';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllCurrenciesPage } from '../all-currencies/all-currencies';

@Component({
  selector: 'page-insert-currency',
  templateUrl: 'insert-currency.html',
})
export class InsertCurrencyPage {

  public currencyForm: CurrencyForm;
  public currencyFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorCurrencyProvider: AdministratorCurrencyProvider, private localStorageProvider: LocalStorageProvider) {
    this.currencyForm = new CurrencyForm();

    this.currencyFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      symbol: ['', Validators.compose([Validators.required, Validators.maxLength(3)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllCurrenciesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorCurrencyProvider.insertCurrency(this.localStorageProvider.getUserTokenValue(), this.currencyForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}