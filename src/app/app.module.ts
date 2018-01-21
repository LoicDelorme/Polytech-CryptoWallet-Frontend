import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';

import { AllAlertsPage } from '../pages/all-alerts/all-alerts';
import { AllAlertTypesPage } from '../pages/all-alerttypes/all-alerttypes';
import { AllAssetsPage } from '../pages/all-assets/all-assets';
import { AllChartPeriodsPage } from '../pages/all-chartperiods/all-chartperiods';
import { AllCryptocurrenciesPage } from '../pages/all-cryptocurrencies/all-cryptocurrencies';
import { AllCurrenciesPage } from '../pages/all-currencies/all-currencies';
import { AllDevicesPage } from '../pages/all-devices/all-devices';
import { AllFavoritesPage } from '../pages/all-favorites/all-favorites';
import { AllLogsPage } from '../pages/all-logs/all-logs';
import { AllThemesPage } from '../pages/all-themes/all-themes';
import { AllTokensPage } from '../pages/all-tokens/all-tokens';
import { AllWalletsPage } from '../pages/all-wallets/all-wallets';

import { ChartPage } from '../pages/chart/chart';
import { HomePage } from '../pages/home/home';

import { InsertAlertPage } from '../pages/insert-alert/insert-alert';
import { InsertAlertTypePage } from '../pages/insert-alerttype/insert-alerttype';
import { InsertAssetPage } from '../pages/insert-asset/insert-asset';
import { InsertChartPeriodPage } from '../pages/insert-chartperiod/insert-chartperiod';
import { InsertCryptocurrencyPage } from '../pages/insert-cryptocurrency/insert-cryptocurrency';
import { InsertCurrencyPage } from '../pages/insert-currency/insert-currency';
import { InsertThemePage } from '../pages/insert-theme/insert-theme';
import { InsertWalletPage } from '../pages/insert-wallet/insert-wallet';

import { OverviewAlertPage } from '../pages/overview-alert/overview-alert';
import { OverviewAlertTypePage } from '../pages/overview-alerttype/overview-alerttype';
import { OverviewChartPeriodPage } from '../pages/overview-chartperiod/overview-chartperiod';
import { OverviewCryptocurrencyPage } from '../pages/overview-cryptocurrency/overview-cryptocurrency';
import { OverviewCurrencyPage } from '../pages/overview-currency/overview-currency';
import { OverviewDevicePage } from '../pages/overview-device/overview-device';
import { OverviewLogPage } from '../pages/overview-log/overview-log';
import { OverviewThemePage } from '../pages/overview-theme/overview-theme';
import { OverviewTokenPage } from '../pages/overview-token/overview-token';
import { OverviewWalletPage } from '../pages/overview-wallet/overview-wallet';

import { SettingsPage } from '../pages/settings/settings';

import { UpdateAlertPage } from '../pages/update-alert/update-alert';
import { UpdateAlertTypePage } from '../pages/update-alerttype/update-alerttype';
import { UpdateAssetPage } from '../pages/update-asset/update-asset';
import { UpdateChartPeriodPage } from '../pages/update-chartperiod/update-chartperiod';
import { UpdateCryptocurrencyPage } from '../pages/update-cryptocurrency/update-cryptocurrency';
import { UpdateCurrencyPage } from '../pages/update-currency/update-currency';
import { UpdateThemePage } from '../pages/update-theme/update-theme';
import { UpdateWalletPage } from '../pages/update-wallet/update-wallet';

import { UserAuthenticationPage } from '../pages/user-authentication/user-authentication';
import { UserOverviewPage } from '../pages/user-overview/user-overview';
import { UserSubscriptionPage } from '../pages/user-subscription/user-subscription';
import { UserUpdatePage } from '../pages/user-update/user-update';

import { AdministratorAlertProvider } from '../providers/administrator/alert';
import { AdministratorAlertTypeProvider } from '../providers/administrator/alerttype';
import { AdministratorAssetProvider } from '../providers/administrator/asset';
import { AdministratorChartPeriodProvider } from '../providers/administrator/chartperiod';
import { AdministratorCryptocurrencyProvider } from '../providers/administrator/cryptocurrency';
import { AdministratorCurrencyProvider } from '../providers/administrator/currency';
import { AdministratorDeviceProvider } from '../providers/administrator/device';
import { AdministratorFavoriteProvider } from '../providers/administrator/favorite';
import { AdministratorLogProvider } from '../providers/administrator/log';
import { AdministratorSettingProvider } from '../providers/administrator/setting';
import { AdministratorThemeProvider } from '../providers/administrator/theme';
import { AdministratorTokenProvider } from '../providers/administrator/token';
import { AdministratorUserProvider } from '../providers/administrator/user';
import { AdministratorWalletProvider } from '../providers/administrator/wallet';

import { CoinMarketCapProvider } from '../providers/coinmarketcap/coinmarketcap';

import { RegisteredAlertTypeProvider } from '../providers/registered/alerttype';
import { UnregisteredChartPeriodProvider } from '../providers/unregistered/chartperiod';
import { RegisteredCurrencyProvider } from '../providers/registered/currency';
import { RegisteredThemeProvider } from '../providers/registered/theme';
import { RegisteredUserProvider } from '../providers/registered/user';

import { LocalStorageProvider } from '../providers/storage/localstorage';

import { UnregisteredCryptocurrencyProvider } from '../providers/unregistered/cryptocurrency';
import { UnregisteredUserProvider } from '../providers/unregistered/user';

@NgModule({
  declarations: [
    MyApp,
    AllAlertsPage,
    AllAlertTypesPage,
    AllAssetsPage,
    AllChartPeriodsPage,
    AllCryptocurrenciesPage,
    AllCurrenciesPage,
    AllDevicesPage,
    AllFavoritesPage,
    AllLogsPage,
    AllThemesPage,
    AllTokensPage,
    AllWalletsPage,
    ChartPage,
    HomePage,
    InsertAlertPage,
    InsertAlertTypePage,
    InsertAssetPage,
    InsertChartPeriodPage,
    InsertCryptocurrencyPage,
    InsertCurrencyPage,
    InsertThemePage,
    InsertWalletPage,
    OverviewAlertPage,
    OverviewAlertTypePage,
    OverviewChartPeriodPage,
    OverviewCryptocurrencyPage,
    OverviewCurrencyPage,
    OverviewDevicePage,
    OverviewLogPage,
    OverviewThemePage,
    OverviewTokenPage,
    OverviewWalletPage,
    SettingsPage,
    UpdateAlertPage,
    UpdateAlertTypePage,
    UpdateAssetPage,
    UpdateChartPeriodPage,
    UpdateCryptocurrencyPage,
    UpdateCurrencyPage,
    UpdateThemePage,
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
    AllAlertsPage,
    AllAlertTypesPage,
    AllAssetsPage,
    AllChartPeriodsPage,
    AllCryptocurrenciesPage,
    AllCurrenciesPage,
    AllDevicesPage,
    AllFavoritesPage,
    AllLogsPage,
    AllThemesPage,
    AllTokensPage,
    AllWalletsPage,
    ChartPage,
    HomePage,
    InsertAlertPage,
    InsertAlertTypePage,
    InsertAssetPage,
    InsertChartPeriodPage,
    InsertCryptocurrencyPage,
    InsertCurrencyPage,
    InsertThemePage,
    InsertWalletPage,
    OverviewAlertPage,
    OverviewAlertTypePage,
    OverviewChartPeriodPage,
    OverviewCryptocurrencyPage,
    OverviewCurrencyPage,
    OverviewDevicePage,
    OverviewLogPage,
    OverviewThemePage,
    OverviewTokenPage,
    OverviewWalletPage,
    SettingsPage,
    UpdateAlertPage,
    UpdateAlertTypePage,
    UpdateAssetPage,
    UpdateChartPeriodPage,
    UpdateCryptocurrencyPage,
    UpdateCurrencyPage,
    UpdateThemePage,
    UpdateWalletPage,
    UserAuthenticationPage,
    UserOverviewPage,
    UserSubscriptionPage,
    UserUpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    Device,
    AdministratorAlertProvider,
    AdministratorAlertTypeProvider,
    AdministratorAssetProvider,
    AdministratorChartPeriodProvider,
    AdministratorCryptocurrencyProvider,
    AdministratorCurrencyProvider,
    AdministratorDeviceProvider,
    AdministratorFavoriteProvider,
    AdministratorLogProvider,
    AdministratorSettingProvider,
    AdministratorThemeProvider,
    AdministratorTokenProvider,
    AdministratorUserProvider,
    AdministratorWalletProvider,
    CoinMarketCapProvider,
    RegisteredAlertTypeProvider,
    RegisteredCurrencyProvider,
    RegisteredThemeProvider,
    RegisteredUserProvider,
    LocalStorageProvider,
    UnregisteredChartPeriodProvider,
    UnregisteredCryptocurrencyProvider,
    UnregisteredUserProvider
  ]
})
export class AppModule {
}