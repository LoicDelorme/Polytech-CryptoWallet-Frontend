import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewAlertTypePage } from '../overview-alerttype/overview-alerttype';
import { InsertAlertTypePage } from '../insert-alerttype/insert-alerttype';

@Component({
  selector: 'page-all-alerttypes',
  templateUrl: 'all-alerttypes.html',
})
export class AllAlertTypesPage {

  public filtered: Array<AlertType> = [];
  public all: Array<AlertType> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private administratorAlertTypeProvider: AdministratorAlertTypeProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      return;
    }

    this.refreshData();
  }

  private refreshData(): void {
    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.administratorAlertTypeProvider.allAlertTypes(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertAlertTypeButtonClicked(): void {
    this.navCtrl.push(InsertAlertTypePage);
  }

  public onRefreshAlertTypesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((alertType: AlertType) => {
        return alertType.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewAlertTypeButtonClicked(alertType: AlertType): void {
    this.navCtrl.push(OverviewAlertTypePage, { alertType: alertType });
  }

  public onDeleteAlertTypeButtonClicked(alertType: AlertType): void {
    this.alertCtrl.create({
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
            this.administratorAlertTypeProvider.deleteAlertType(this.localStorageProvider.getUserTokenValue(), alertType).subscribe(result => {
              this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
              this.refreshData();
            }, error => {
              console.error(error);
              this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
            });
          }
        }
      ]
    }).present();
  }
}