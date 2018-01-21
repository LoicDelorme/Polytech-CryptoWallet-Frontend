import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';

import { ThemeForm } from '../../forms/themeform';

import { AdministratorThemeProvider } from '../../providers/administrator/theme';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllThemesPage } from '../all-themes/all-themes';

@Component({
  selector: 'page-insert-theme',
  templateUrl: 'insert-theme.html',
})
export class InsertThemePage {

  public themeForm: ThemeForm;
  public themeFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorThemeProvider: AdministratorThemeProvider, private localStorageProvider: LocalStorageProvider) {
    this.themeForm = new ThemeForm();

    this.themeFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(250)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllThemesPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorThemeProvider.insertTheme(this.localStorageProvider.getUserTokenValue(), this.themeForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}