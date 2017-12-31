import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { AllAlertsPage } from '../pages/all-alerts/all-alerts';
import { AllAlertTypesPage } from '../pages/all-alerttypes/all-alerttypes';
import { AllAssetsPage } from '../pages/all-assets/all-assets';
import { AllCryptocurrenciesPage } from '../pages/all-cryptocurrencies/all-cryptocurrencies';
import { AllFavoritesPage } from '../pages/all-favorites/all-favorites';
import { AllLogsPage } from '../pages/all-logs/all-logs';
import { AllSettingsPage } from '../pages/all-settings/all-settings';
import { AllTokensPage } from '../pages/all-tokens/all-tokens';
import { AllWalletsPage } from '../pages/all-wallets/all-wallets';

import { ChartPage } from '../pages/chart/chart';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';

import { InsertAlertPage } from '../pages/insert-alert/insert-alert';
import { InsertAlertTypePage } from '../pages/insert-alerttype/insert-alerttype';
import { InsertAssetPage } from '../pages/insert-asset/insert-asset';
import { InsertCryptocurrencyPage } from '../pages/insert-cryptocurrency/insert-cryptocurrency';
import { InsertSettingPage } from '../pages/insert-setting/insert-setting';
import { InsertWalletPage } from '../pages/insert-wallet/insert-wallet';

import { OverviewAlertPage } from '../pages/overview-alert/overview-alert';
import { OverviewAlertTypePage } from '../pages/overview-alerttype/overview-alerttype';
import { OverviewCryptocurrencyPage } from '../pages/overview-cryptocurrency/overview-cryptocurrency';
import { OverviewLogPage } from '../pages/overview-log/overview-log';
import { OverviewSettingPage } from '../pages/overview-setting/overview-setting';
import { OverviewTokenPage } from '../pages/overview-token/overview-token';
import { OverviewWalletPage } from '../pages/overview-wallet/overview-wallet';

import { UpdateAlertPage } from '../pages/update-alert/update-alert';
import { UpdateAlertTypePage } from '../pages/update-alerttype/update-alerttype';
import { UpdateAssetPage } from '../pages/update-asset/update-asset';
import { UpdateCryptocurrencyPage } from '../pages/update-cryptocurrency/update-cryptocurrency';
import { UpdateSettingPage } from '../pages/update-setting/update-setting';
import { UpdateWalletPage } from '../pages/update-wallet/update-wallet';

import { UserAuthenticationPage } from '../pages/user-authentication/user-authentication';
import { UserOverviewPage } from '../pages/user-overview/user-overview';
import { UserSubscriptionPage } from '../pages/user-subscription/user-subscription';
import { UserUpdatePage } from '../pages/user-update/user-update';

import { AdministratorAlertProvider } from '../providers/administrator/alert/alert';
import { AdministratorAlertTypeProvider } from '../providers/administrator/alerttype/alerttype';
import { AdministratorAssetProvider } from '../providers/administrator/asset/asset';
import { AdministratorCryptocurrencyProvider } from '../providers/administrator/cryptocurrency/cryptocurrency';
import { AdministratorFavoriteProvider } from '../providers/administrator/favorite/favorite';
import { AdministratorLogProvider } from '../providers/administrator/log/log';
import { AdministratorSettingProvider } from '../providers/administrator/setting/setting';
import { AdministratorTokenProvider } from '../providers/administrator/token/token';
import { AdministratorUserProvider } from '../providers/administrator/user/user';
import { AdministratorWalletProvider } from '../providers/administrator/wallet/wallet';

import { LocalInformationProvider } from '../providers/local/information/information';

import { RegisteredAlertTypeProvider } from '../providers/registered/alerttype/alerttype';
import { RegisteredUserProvider } from '../providers/registered/user/user';

import { UnregisteredCryptocurrencyProvider } from '../providers/unregistered/cryptocurrency/cryptocurrency';
import { UnregisteredUserProvider } from '../providers/unregistered/user/user';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AllAlertsPage,
    AllAlertTypesPage,
    AllAssetsPage,
    AllCryptocurrenciesPage,
    AllFavoritesPage,
    AllLogsPage,
    AllSettingsPage,
    AllTokensPage,
    AllWalletsPage,
    ChartPage,
    SettingsPage,
    HomePage,
    InsertAlertPage,
    InsertAlertTypePage,
    InsertAssetPage,
    InsertCryptocurrencyPage,
    InsertSettingPage,
    InsertWalletPage,
    OverviewAlertPage,
    OverviewAlertTypePage,
    OverviewCryptocurrencyPage,
    OverviewLogPage,
    OverviewSettingPage,
    OverviewTokenPage,
    OverviewWalletPage,
    UpdateAlertPage,
    UpdateAlertTypePage,
    UpdateAssetPage,
    UpdateCryptocurrencyPage,
    UpdateSettingPage,
    UpdateWalletPage,
    UserAuthenticationPage,
    UserOverviewPage,
    UserSubscriptionPage,
    UserUpdatePage
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
    TabsPage,
    AllAlertsPage,
    AllAlertTypesPage,
    AllAssetsPage,
    AllCryptocurrenciesPage,
    AllFavoritesPage,
    AllLogsPage,
    AllSettingsPage,
    AllTokensPage,
    AllWalletsPage,
    ChartPage,
    SettingsPage,
    HomePage,
    InsertAlertPage,
    InsertAlertTypePage,
    InsertAssetPage,
    InsertCryptocurrencyPage,
    InsertSettingPage,
    InsertWalletPage,
    OverviewAlertPage,
    OverviewAlertTypePage,
    OverviewCryptocurrencyPage,
    OverviewLogPage,
    OverviewSettingPage,
    OverviewTokenPage,
    OverviewWalletPage,
    UpdateAlertPage,
    UpdateAlertTypePage,
    UpdateAssetPage,
    UpdateCryptocurrencyPage,
    UpdateSettingPage,
    UpdateWalletPage,
    UserAuthenticationPage,
    UserOverviewPage,
    UserSubscriptionPage,
    UserUpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AdministratorAlertProvider,
    AdministratorAlertTypeProvider,
    AdministratorAssetProvider,
    AdministratorCryptocurrencyProvider,
    AdministratorFavoriteProvider,
    AdministratorLogProvider,
    AdministratorSettingProvider,
    AdministratorTokenProvider,
    AdministratorUserProvider,
    AdministratorWalletProvider,
    LocalInformationProvider,
    RegisteredAlertTypeProvider,
    RegisteredUserProvider,
    UnregisteredCryptocurrencyProvider,
    UnregisteredUserProvider
  ]
})
export class AppModule {
}