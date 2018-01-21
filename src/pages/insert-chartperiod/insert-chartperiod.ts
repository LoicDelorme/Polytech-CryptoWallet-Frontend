import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';

import { ChartPeriodForm } from '../../forms/chartperiodform';

import { AdministratorChartPeriodProvider } from '../../providers/administrator/chartperiod';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { AllChartPeriodsPage } from '../all-chartperiods/all-chartperiods';

@Component({
  selector: 'page-insert-chartperiod',
  templateUrl: 'insert-chartperiod.html',
})
export class InsertChartPeriodPage {

  public chartPeriodForm: ChartPeriodForm;
  public chartPeriodFormGroup: FormGroup;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private formBuilder: FormBuilder, private administratorChartPeriodProvider: AdministratorChartPeriodProvider, private localStorageProvider: LocalStorageProvider) {
    this.chartPeriodForm = new ChartPeriodForm();

    this.chartPeriodFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(3)])]
    });
  }

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllChartPeriodsPage });
      return;
    }
  }

  public onSubmit(value: any): void {
    this.administratorChartPeriodProvider.insertChartPeriod(this.localStorageProvider.getUserTokenValue(), this.chartPeriodForm).subscribe(result => {
      this.toastCtrl.create({ message: result.message, duration: 3000, position: 'top' }).present();
      this.navCtrl.pop();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();
    });
  }
}