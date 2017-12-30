import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Token } from '../../entities/token';

import { RegisteredUserProvider } from '../../providers/registered/user/user';
import { LocalInformationProvider } from '../../providers/local/information/information';

import { AuthenticationPage } from '../authentication/authentication';
import { OverviewTokenPage } from '../overview-token/overview-token';

@Component({
  selector: 'page-all-tokens',
  templateUrl: 'all-tokens.html',
})
export class AllTokensPage {

  public filteredTokens: Array<Token> = [];
  public allTokens: Array<Token> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public registeredUserProvider: RegisteredUserProvider, public localInformationProvider: LocalInformationProvider) {
  }

  public ionViewWillEnter(): void {
    if (!this.localInformationProvider.isUserRegistered()) {
      this.navCtrl.setRoot(AuthenticationPage, { onSuccessRedirect: AllTokensPage });
    }
  }

  public ionViewDidEnter(): void {
    if (this.localInformationProvider.isUserRegistered()) {
      this.registeredUserProvider.allTokens(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
        console.warn(data);

        this.allTokens = data.data;
        this.filteredTokens = data.data;
      });
    }
  }

  public onRefreshTokensButtonClicked(): void {
    this.registeredUserProvider.allTokens(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId()).subscribe(data => {
      console.warn(data);

      this.allTokens = data.data;
      this.filteredTokens = data.data;
    });
  }

  public onFilterTriggered(event: any): void {
    this.filteredTokens = this.allTokens;

    let filter = event.target.value;
    if (filter && filter.trim() != '') {
      this.filteredTokens = this.filteredTokens.filter((token: Token) => {
        return token.value.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    }
  }

  public onOverviewTokenButtonClicked(token: Token): void {
    this.navCtrl.push(OverviewTokenPage, { token: token });
  }

  public onDeleteTokenButtonClicked(token: Token): void {
    let confirmationAlert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you really want to delete this token?',
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
            this.registeredUserProvider.deleteToken(this.localInformationProvider.getUserTokenValue(), this.localInformationProvider.getUserId(), token).subscribe(data => {
              console.warn(data);

              let filteredIndex: number = this.filteredTokens.indexOf(token);
              if (filteredIndex != -1) {
                this.filteredTokens.splice(filteredIndex, 1);
              }
        
              let allIndex: number = this.allTokens.indexOf(token);
              if (allIndex != -1 && allIndex != filteredIndex) {
                this.allTokens.splice(allIndex, 1);
              }
            });
          }
        }
      ]
    });

    confirmationAlert.present();
  }
}