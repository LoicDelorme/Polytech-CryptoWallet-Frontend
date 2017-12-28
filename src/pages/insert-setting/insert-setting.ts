import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { SettingForm } from '../../forms/settingform';

import { RegisteredUserProvider } from '../../providers/registered/user/user';

import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-insert-setting',
  templateUrl: 'insert-setting.html',
})
export class InsertSettingPage {

  public settingForm: SettingForm;
  public settingFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public registeredUserProvider: RegisteredUserProvider) {
    this.settingForm = new SettingForm();
    this.settingFormGroup = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      theme: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public onSubmit(value: any): void {
    if (this.settingFormGroup.valid) {
      this.settingForm.userId = parseInt(window.localStorage.getItem("user.id"));
      this.registeredUserProvider.insertSetting(window.localStorage.getItem("user.token.value"), parseInt(window.localStorage.getItem("user.id")), this.settingForm).subscribe(data => {
        console.warn(data);

        this.navCtrl.setRoot(SettingsPage);
      });
    }
  }
}