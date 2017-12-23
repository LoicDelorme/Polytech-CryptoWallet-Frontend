import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { CryptocurrenciesPage } from '../pages/cryptocurrencies/cryptocurrencies';

import { CryptocurrenciesProvider } from '../providers/cryptocurrencies/cryptocurrencies';

@NgModule({
  declarations: [
    MyApp,
    CryptocurrenciesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    CryptocurrenciesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CryptocurrenciesProvider
  ]
})
export class AppModule {
}