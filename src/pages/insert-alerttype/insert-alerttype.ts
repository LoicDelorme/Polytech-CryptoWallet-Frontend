import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AlertTypeForm } from '../../forms/alerttypeform';

import { AdministratorAlertTypeProvider } from '../../providers/administrator/alerttype/alerttype';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllSettingsPage } from '../all-settings/all-settings';

@Component({
  selector: 'page-insert-alerttype',
  templateUrl: 'insert-alerttype.html',
})
export class InsertAlertTypePage {

  public alertTypeForm: AlertTypeForm;
  public alertTypeFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public administratorAlertTypeProvider: AdministratorAlertTypeProvider, public localInformationProvider: LocalInformationProvider) {
    this.alertTypeForm = new AlertTypeForm();

    this.alertTypeFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllSettingsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.alertTypeFormGroup.valid) {
      this.administratorAlertTypeProvider.insertAlertType(this.localInformationProvider.getUserTokenValue(), this.alertTypeForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.pop();
      });
    }
  }
}