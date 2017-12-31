import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { SettingForm } from '../../forms/settingform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllSettingsPage } from '../all-settings/all-settings';

@Component({
  selector: 'page-insert-setting',
  templateUrl: 'insert-setting.html',
})
export class InsertSettingPage {

  public settingForm: SettingForm;
  public settingFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
    this.settingForm = new SettingForm();
    this.settingForm.userId = this.localInformationProvider.getUserId();

    this.settingFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      theme: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      chartPeriod: ['', Validators.compose([Validators.required, /*Validators.pattern("")*/, Validators.maxLength(3)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllSettingsPage });
    }
  }

  public onSubmit(value: any): void {
    if (this.settingFormGroup.valid) {
      this.registeredUserProvider.insertSetting(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), this.settingForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.pop();
      });
    }
  }
}