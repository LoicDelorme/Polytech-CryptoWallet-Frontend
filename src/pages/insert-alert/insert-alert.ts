import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { AlertType } from '../../entities/alerttype';
import { AlertForm } from '../../forms/alertform';

import { RegisteredAlertTypeProvider } from '../../providers/registered/alerttype';
import { RegisteredUserProvider } from '../../providers/registered/user';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertsPage } from '../all-alerts/all-alerts';

@Component({
  selector: 'page-insert-alert',
  templateUrl: 'insert-alert.html',
})
export class InsertAlertPage {

  public allFavorites: Array<Cryptocurrency> = [];
  public allTypes: Array<AlertType> = [];
  public alertForm: AlertForm;
  public alertFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private registeredUserProvider: RegisteredUserProvider, private registeredAlertTypeProvider: RegisteredAlertTypeProvider, private localStorageProvider: LocalStorageProvider) {
    this.alertForm = new AlertForm();
    this.alertForm.oneShot = false;
    this.alertForm.active = false;

    this.alertFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      cryptocurrencyId: ['', Validators.compose([Validators.required])],
      typeId: ['', Validators.compose([Validators.required])],
      threshold: ['', Validators.compose([Validators.required])],
      oneShot: [false],
      active: [false]
    });
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

      this.registeredAlertTypeProvider.allAlertTypes(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
        this.allTypes = result.data;

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
    this.alertForm.userId = this.localStorageProvider.getUserId();

    this.registeredUserProvider.insertAlert(this.localStorageProvider.getUserTokenValue(), this.alertForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
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