import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewAlertTypePage } from '../overview-alerttype/overview-alerttype';
import { InsertAlertTypePage } from '../insert-alerttype/insert-alerttype';
import { CryptocurrenciesPage } from '../cryptocurrencies/cryptocurrencies';

@Component({
  selector: 'page-all-alerttypes',
  templateUrl: 'all-alerttypes.html',
})
export class AllAlertTypesPage {

  public filteredAlertTypes: Array<AlertType> = [];
  public allAlertTypes: Array<AlertType> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public administratorAlertTypeProvider: AdministratorAlertTypeProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: CryptocurrenciesPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserAdministrator()) {
      this.administratorAlertTypeProvider.allAlertTypes(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
        console.warn(data);

        this.allAlertTypes = data.data;
        this.filteredAlertTypes = data.data;
      });
    }
  }

  public onInsertAlertTypeButtonClicked(): void {
    this.navCtrl.push(InsertAlertTypePage);
  }

  public onRefreshAlertTypesButtonClicked(): void {
    this.administratorAlertTypeProvider.allAlertTypes(this.localInformationProvider.getUserTokenValue()).subscribe(data => {
      console.warn(data);

      this.allAlertTypes = data.data;
      this.filteredAlertTypes = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredAlertTypes = this.allAlertTypes;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredAlertTypes = this.filteredAlertTypes.filter((alertType: AlertType) => {
        return alertType.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewAlertTypeButtonClicked(alertType: AlertType): void {
    this.navCtrl.push(OverviewAlertTypePage, { alertType: alertType });
  }

  public onDeleteAlertTypeButtonClicked(alertType: AlertType): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this alert type?',
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
            this.administratorAlertTypeProvider.deleteAlertType(this.localInformationProvider.getUserTokenValue(), alertType).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredAlertTypes.indexOf(alertType);
              if (filteredIndex != -1) {
                this.filteredAlertTypes.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allAlertTypes.indexOf(alertType);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allAlertTypes.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}