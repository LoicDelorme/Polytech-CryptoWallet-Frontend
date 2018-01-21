import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Alert } from '../../entities/alert';
import { Cryptocurrency } from '../../entities/cryptocurrency';
import { AlertType } from '../../entities/alerttype';
import { AlertForm } from '../../forms/alertform';

import { RegisteredUserProvider } from '../../providers/registered/user';
import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-update-alert',
  templateUrl: 'update-alert.html',
})
export class UpdateAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private registeredAlertTypeProvider: RegisteredAlertTypeProvider, private localStorageProvider: LocalStorageProvider) {
    this.alertForm = new AlertForm();

    this.alertFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      cryptocurrencyId: ['', Validators.compose([Validators.required])],
      typeId: ['', Validators.compose([Validators.required])],
      threshold: ['', Validators.compose([Validators.required])],
      oneShot: [false],
      active: [false]
    });

    let alert: Alert = this.navParams.get("alert");
    this.alertForm.id = alert.id;
    this.alertForm.name = alert.name;
    this.alertForm.threshold = alert.threshold;
    this.alertForm.oneShot = alert.oneShot;
    this.alertForm.active = alert.active;
    this.alertForm.userId = alert.userId;
    this.alertForm.cryptocurrencyId = alert.cryptocurrency.id;
    this.alertForm.typeId = alert.type.id;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertsPage });
      return;
    }
  }

  public ionViewDidEnter(): void {
    if (!this.localStorageProvider.isUserRegistered()) {
      return;
    }

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.registeredUserProvider.allFavorites(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.allFavorites = result.data;
      this.updateName();

      this.registeredAlertTypeProvider.allAlertTypes(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
        this.allTypes = result.data;
        this.updateName();

        loadingOverlay.dismiss();
      }, error => {
        console.error(error);
        this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

        loadingOverlay.dismiss();
      });
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onSubmit(value: any): void {
    this.registeredUserProvider.updateAlert(this.localStorageProvider.getUserTokenValue(), this.alertForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.getPrevious().data.alert = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }

  public updateName(): void {
    let favorite: Cryptocurrency = this.allFavorites.find(favorite => { return favorite.id == this.alertForm.cryptocurrencyId; });
    let type: AlertType = this.allTypes.find(type => { return type.id == this.alertForm.typeId; });
    let threshold: number = this.alertForm.threshold;

    this.alertForm.name = (favorite ? favorite.name : "\"Cryptocurrency\"") + " " + (type ? type.name : "\"Type\"") + " " + (threshold ? threshold : "\"Threshold\"");
  }
}