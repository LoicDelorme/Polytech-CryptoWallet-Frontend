import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';

import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllAlertTypesPage } from '../all-alerttypes/all-alerttypes';

@Component({
  selector: 'page-insert-alerttype',
  templateUrl: 'insert-alerttype.html',
})
export class InsertAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorAlertTypeProvider: AdministratorAlertTypeProvider, private localStorageProvider: LocalStorageProvider) {
    this.alertTypeForm = new AlertTypeForm();

    this.alertTypeFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllAlertTypesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorAlertTypeProvider.insertAlertType(this.localStorageProvider.getUserTokenValue(), this.alertTypeForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}