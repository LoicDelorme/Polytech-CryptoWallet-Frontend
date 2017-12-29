import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AlertType } from '../../model/alerttype';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';

import { OverviewAlertTypePage } from '../overview-alerttype/overview-alerttype';

@Component({
  selector: 'page-alerttypes',
  templateUrl: 'alerttypes.html',
})
export class AlertTypesPage {

  public filteredAlertTypes: Array<AlertType> = [];
  public allAlertTypes: Array<AlertType> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public administratorAlertTypeProvider: AdministratorAlertTypeProvider) {
  }

  public ionViewDidEnter(): void {
    this.administratorAlertTypeProvider.allAlertTypes(window.localStorage.getItem("user.token.value")).subscribe(data => {
      this.allAlertTypes = data.data;
      this.filteredAlertTypes = data.data;
    });
  }

  public onRefreshAlertTypesButtonClicked(): void {
    this.administratorAlertTypeProvider.allAlertTypes(window.localStorage.getItem("user.token.value")).subscribe(data => {
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
          handler: () => {
          }
        },
        {
          text: 'Ok',
          role: null,
          handler: () => {
            this.administratorAlertTypeProvider.deleteAlertType(window.localStorage.getItem("user.token.value"), alertType).subscribe(data => {
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