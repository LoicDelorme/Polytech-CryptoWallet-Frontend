import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AlertType } from '../../entities/alerttype';
import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-update-alerttype',
  templateUrl: 'update-alerttype.html',
})
export class UpdateAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorAlertTypeProvider: AdministratorAlertTypeProvider, private localStorageProvider: LocalStorageProvider) {
    this.alertTypeForm = new AlertTypeForm();

    this.alertTypeFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });

    let alertType: AlertType = this.navParams.get("alertType");
    this.alertTypeForm.id = alertType.id;
    this.alertTypeForm.name = alertType.name;
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorAlertTypeProvider.updateAlertType(this.localStorageProvider.getUserTokenValue(), this.alertTypeForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.getPrevious().data.alertType = result.data;
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}