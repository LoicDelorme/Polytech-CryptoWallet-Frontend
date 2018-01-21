import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { Theme } from '../../entities/theme';

import { AdministratorThemeProvider } from '../../providers/administrator/theme';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

import { UserAuthenticationPage } from '../user-authentication/user-authentication';
import { OverviewThemePage } from '../overview-theme/overview-theme';
import { InsertThemePage } from '../insert-theme/insert-theme';

@Component({
  selector: 'page-all-themes',
  templateUrl: 'all-themes.html',
})
export class AllThemesPage {

  public filtered: Array<Theme> = [];
  public all: Array<Theme> = [];

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private administratorThemeProvider: AdministratorThemeProvider, private localStorageProvider: LocalStorageProvider) {}

  public ionViewWillEnter(): void {
    if (!this.localStorageProvider.isUserAdministrator()) {
      this.navCtrl.setRoot(UserAuthenticationPage, { onSuccessRedirect: AllThemesPage });
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

    this.administratorThemeProvider.allThemes(this.localStorageProvider.getUserTokenValue()).subscribe(result => {
      this.all = result.data;
      this.filtered = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  public onInsertThemeButtonClicked(): void {
    this.navCtrl.push(InsertThemePage);
  }

  public onRefreshThemesButtonClicked(): void {
    this.refreshData();
  }

  public onFilterTriggered(event: any): void {
    this.filtered = this.all;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filtered = this.all.filter((theme: Theme) => {
        return theme.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewThemeButtonClicked(theme: Theme): void {
    this.navCtrl.push(OverviewThemePage, { theme: theme });
  }

  public onDeleteThemeButtonClicked(theme: Theme): void {
    this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this theme?',
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
            this.administratorThemeProvider.deleteTheme(this.localStorageProvider.getUserTokenValue(), theme).subscribe(result => {
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