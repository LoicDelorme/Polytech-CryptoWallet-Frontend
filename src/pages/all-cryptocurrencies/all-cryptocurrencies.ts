import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { AdministratorCryptocurrencyProvider } from '../../providers/administrator/cryptocurrency/cryptocurrency';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewCryptocurrencyPage } from '../overview-cryptocurrency/overview-cryptocurrency';
import { InsertCryptocurrencyPage } from '../insert-cryptocurrency/insert-cryptocurrency';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-all-cryptocurrencies',
  templateUrl: 'all-cryptocurrencies.html',
})
export class AllCryptocurrenciesPage {

  public filteredCryptocurrencies: Array<Cryptocurrency> = [];
  public allCryptocurrencies: Array<Cryptocurrency> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public administratorCryptocurrencyProvider: AdministratorCryptocurrencyProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: CryptocurrenciesPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserAdministrator()) {
      this.administratorCryptocurrencyProvider.allCryptocurrencies(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
        console.warn(data);

        this.allCryptocurrencies = data.data;
        this.filteredCryptocurrencies = data.data;
      });
    }
  }

  public onInsertCryptocurrencyButtonClicked(): void {
    this.navCtrl.push(InsertCryptocurrencyPage);
  }

  public onRefreshCryptocurrenciesButtonClicked(): void {
    this.administratorCryptocurrencyProvider.allCryptocurrencies(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
      console.warn(data);

      this.allCryptocurrencies = data.data;
      this.filteredCryptocurrencies = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredCryptocurrencies = this.allCryptocurrencies;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredCryptocurrencies = this.filteredCryptocurrencies.filter((cryptocurrency: Cryptocurrency) => {
        return (cryptocurrency.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (cryptocurrency.symbol.toLowerCase().indexOf(filter.toLowerCase()) > -1);
      });
    }
  }

  public onOverviewCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    this.navCtrl.push(OverviewCryptocurrencyPage, { cryptocurrency: cryptocurrency });
  }

  public onDeleteCryptocurrencyButtonClicked(cryptocurrency: Cryptocurrency): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this cryptocurrency?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.administratorCryptocurrencyProvider.deleteCryptocurrency(this.localInformationProvider.getUserTokenValue(), cryptocurrency).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredCryptocurrencies.indexOf(cryptocurrency);
              if (filteredIndex != -1) {
                this.filteredCryptocurrencies.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allCryptocurrencies.indexOf(cryptocurrency);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allCryptocurrencies.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}