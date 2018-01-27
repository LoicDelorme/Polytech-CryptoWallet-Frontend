import { Component, ViewChild } from '@angular/core';
import { NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { ChartPeriod } from '../../entities/chartperiod';
import { Graphs } from '../../entities/graphs';
import { CryptoWalletResponse } from '../../responses/cryptowalletresponse';

import { CoinMarketCapProvider } from '../../providers/coinmarketcap/coinmarketcap';
import { UnregisteredChartPeriodProvider } from '../../providers/unregistered/chartperiod';
import { LocalStorageProvider } from '../../providers/storage/localstorage';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  @ViewChild('usdChart') usdChart;
  @ViewChild('btcChart') btcChart;
  @ViewChild('marketCapChart') marketCapChart;
  @ViewChild('volumesChart') volumesChart;

  public allChartPeriods: Array<ChartPeriod>;
  public cryptocurrency: Cryptocurrency;
  public usdChartPeriod: string;
  public btcChartPeriod: string;
  public marketCapChartPeriod: string;
  public volumesChartPeriod: string;

  constructor(private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private coinMarketCapProvider: CoinMarketCapProvider, private unregisteredChartPeriodProvider: UnregisteredChartPeriodProvider, private localStorageProvider: LocalStorageProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewWillEnter(): void {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewDidEnter(): void {
    let defaultChartPeriod: string = (this.localStorageProvider.isUserRegistered() ? this.localStorageProvider.getSetting().chartPeriod.name : "7D");
    this.usdChartPeriod = defaultChartPeriod;
    this.btcChartPeriod = defaultChartPeriod;
    this.marketCapChartPeriod = defaultChartPeriod;
    this.volumesChartPeriod = defaultChartPeriod;

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    this.unregisteredChartPeriodProvider.allChartPeriods().subscribe(result => {
      this.allChartPeriods = result.data;

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });

    this.usdChart = new Chart(this.usdChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: "USD",
          data: [],
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              maxTicksLimit: this.getMaxTicksValue(this.usdChartPeriod)
            }
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      }
    });

    this.btcChart = new Chart(this.btcChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
            label: "BTC",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
                maxTicksLimit: this.getMaxTicksValue(this.btcChartPeriod)
            }
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      }
    });

    this.marketCapChart = new Chart(this.marketCapChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
            label: "Market Cap",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
                maxTicksLimit: this.getMaxTicksValue(this.marketCapChartPeriod)
            }
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      }
    });

    this.volumesChart = new Chart(this.volumesChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
            label: "Volumes",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
                maxTicksLimit: this.getMaxTicksValue(this.volumesChartPeriod)
            }
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      }
    });

    this.refreshUsdData();
    this.refreshBtcData();
    this.refreshMarketCapData();
    this.refreshVolumesData();
  }

  public ionViewDidLeave(): void {
    this.usdChart.destroy();
    this.btcChart.destroy();
    this.marketCapChart.destroy();
    this.volumesChart.destroy();
  }

  public onRefreshChartsButtonClicked(): void {
    this.refreshUsdData();
    this.refreshBtcData();
    this.refreshMarketCapData();
    this.refreshVolumesData();
  }

  public onRefreshUsdChartPeriodChanged(): void {
    this.refreshUsdData();
  }

  public onRefreshBtcChartPeriodChanged(): void {
    this.refreshBtcData();
  }

  public onRefreshMarketCapChartPeriodChanged(): void {
    this.refreshMarketCapData();
  }

  public onRefreshVolumesChartPeriodChanged(): void {
    this.refreshVolumesData();
  }

  private refreshUsdData(): void {
    this.refreshData(this.usdChart, this.usdChartPeriod, this.refreshChart, this.refreshUsdChart);
  }

  private refreshBtcData(): void {
    this.refreshData(this.btcChart, this.btcChartPeriod, this.refreshChart, this.refreshBtcChart);
  }

  private refreshMarketCapData(): void {
    this.refreshData(this.marketCapChart, this.marketCapChartPeriod, this.refreshChart, this.refreshMarketCapChart);
  }

  private refreshVolumesData(): void {
    this.refreshData(this.volumesChart, this.volumesChartPeriod, this.refreshChart, this.refreshVolumesChart);
  }

  private refreshData(chart: Chart, period: string, refreshChart: Function, refreshChartCallback: Function): void {
    let startDateValue: string = moment().subtract(this.getNumberValue(period), this.getDurationValue(period)).format("x");
    let endDateValue: string = moment().format("x");

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    let graphsResponse: Observable<CryptoWalletResponse<Graphs>> = (period === "ALL" ? this.coinMarketCapProvider.allPrices(this.cryptocurrency) : this.coinMarketCapProvider.allPricesBetween(this.cryptocurrency, startDateValue, endDateValue));
    graphsResponse.subscribe(result => {
      refreshChartCallback(refreshChart, chart, result.data, this.getFormatValue(period), this.getMaxTicksValue(period));

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  private getNumberValue(chartPeriod: string): string {
    let number: string = chartPeriod.charAt(0);
    return (number !== "A" ? number : null);
  }

  private getDurationValue(chartPeriod: string): moment.unitOfTime.DurationConstructor {
    let duration: string = chartPeriod.charAt(chartPeriod.length - 1);
    switch(duration) {
      case "D":
        return "d";
      case "M":
        return "M";
      case "Y":
        return "y";
      default:
        return null;
    }
  }

  private getFormatValue(chartPeriod: string): string {
    switch(chartPeriod) {
      case "1D":
        return "HH";
      case "7D":
        return "DD";
      case "1M":
        return "DD";
      case "3M":
        return "MMM";
      case "1Y":
        return "MMM YYYY";
      default:
        return "[Q]Q YYYY";
    }
  }

  private getMaxTicksValue(chartPeriod: string): number {
    switch(chartPeriod) {
      case "1D":
        return 8;
      case "7D":
        return 7;
      case "1M":
        return 8;
      case "3M":
        return 6;
      case "1Y":
        return 12;
      default:
        return 12;
    }
  }

  private refreshUsdChart(refreshChart: Function, chart: Chart, graphs: Graphs, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, graphs.priceUsd, labelFormat, maxTicksValue);
  }

  private refreshBtcChart(refreshChart: Function, chart: Chart, graphs: Graphs, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, graphs.priceBtc, labelFormat, maxTicksValue);
  }

  private refreshMarketCapChart(refreshChart: Function, chart: Chart, graphs: Graphs, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, graphs.marketCapByAvailableSupply, labelFormat, maxTicksValue);
  }

  private refreshVolumesChart(refreshChart: Function, chart: Chart, graphs: Graphs, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, graphs.volumeUsd, labelFormat, maxTicksValue);
  }

  private refreshChart(chart: Chart, values: Array<Array<number>>, labelFormat: string, maxTicksValue: number): void {
    // Remove existing data
    chart.data.labels = [];
    chart.data.datasets[0].data = [];

    // Add new data
    for (let offset = 0; offset < values.length; offset++) {
      chart.data.labels.push(moment(values[offset][0]).format(labelFormat));
      chart.data.datasets[0].data.push(values[offset][1]);
    }

    // Update configuration
    chart.options.scales.xAxes[0].ticks.maxTicksLimit = maxTicksValue;

    // Update the chart
    chart.update();
  }
}