import { Component, ViewChild } from '@angular/core';
import { NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CoinMarketCapGraphsResponse } from '../../responses/coinmarketcapgraphsresponse';

import { CoinMarketCapProvider } from '../../providers/coinmarketcap/coinmarketcap';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  private readonly buttonValues: Array<string> = ["1D", "7D", "1M", "3M", "1Y", "ALL"];
  private readonly numberValues: Array<string> = ["1", "7", "1", "3", "1", null];
  private readonly durationValues: Array<moment.unitOfTime.DurationConstructor> = ["d", "d", "M", "M", "y", null];
  private readonly formatValues: Array<string> = ["HH", "DD", "DD", "MMM", "MMM YYYY", "[Q]Q YYYY"];
  private readonly maxTicksValues: Array<number> = [8, 7, 8, 6, 12, 12];

  @ViewChild('usdChart') usdChart;
  @ViewChild('btcChart') btcChart;
  @ViewChild('marketCapChart') marketCapChart;
  @ViewChild('volumesChart') volumesChart;

  public cryptocurrency: Cryptocurrency;
  public usdPeriod: string;
  public btcPeriod: string;
  public marketCapPeriod: string;
  public volumesPeriod: string;
  public usdChartButtonDisabled: string;
  public btcChartButtonDisabled: string;
  public marketCapChartButtonDisabled: string;
  public volumesChartButtonDisabled: string;

  constructor(private navParams: NavParams, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private coinMarketCapProvider: CoinMarketCapProvider) {
    let defaultButtonValue: string = this.buttonValues[1];
    this.usdPeriod = defaultButtonValue;
    this.usdChartButtonDisabled = defaultButtonValue;
    this.btcPeriod = defaultButtonValue;
    this.btcChartButtonDisabled = defaultButtonValue;
    this.marketCapPeriod = defaultButtonValue
    this.marketCapChartButtonDisabled = defaultButtonValue;
    this.volumesPeriod = defaultButtonValue;
    this.volumesChartButtonDisabled = defaultButtonValue;
  }

  public ionViewWillEnter(): void {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewDidEnter(): void {
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
              maxTicksLimit: 7
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
                maxTicksLimit: 7
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
                maxTicksLimit: 7
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
                maxTicksLimit: 7
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

  public onRefreshUsdChartButtonClicked(usdPeriod: string): void {
    this.usdPeriod = usdPeriod;
    this.usdChartButtonDisabled = usdPeriod;
    this.refreshUsdData();
  }

  public onRefreshBtcChartButtonClicked(btcPeriod: string): void {
    this.btcPeriod = btcPeriod;
    this.btcChartButtonDisabled = btcPeriod;
    this.refreshBtcData();
  }

  public onRefreshMarketCapChartButtonClicked(marketCapPeriod: string): void {
    this.marketCapPeriod = marketCapPeriod;
    this.marketCapChartButtonDisabled = marketCapPeriod;
    this.refreshMarketCapData();
  }

  public onRefreshVolumesChartButtonClicked(volumesPeriod: string): void {
    this.volumesPeriod = volumesPeriod;
    this.volumesChartButtonDisabled = volumesPeriod;
    this.refreshVolumesData();
  }

  private refreshUsdData(): void {
    this.refreshData(this.usdChart, this.usdPeriod, this.refreshChart, this.refreshUsdChart);
  }

  private refreshBtcData(): void {
    this.refreshData(this.btcChart, this.btcPeriod, this.refreshChart, this.refreshBtcChart);
  }

  private refreshMarketCapData(): void {
    this.refreshData(this.marketCapChart, this.marketCapPeriod, this.refreshChart, this.refreshMarketCapChart);
  }

  private refreshVolumesData(): void {
    this.refreshData(this.volumesChart, this.volumesPeriod, this.refreshChart, this.refreshVolumesChart);
  }

  private refreshData(chart: Chart, period: string, refreshChart: Function, refreshChartCallback: Function): void {
    let offsetValue: number = this.buttonValues.indexOf(period);

    let numberValue: string = this.numberValues[offsetValue];
    let durationValue: moment.unitOfTime.DurationConstructor = this.durationValues[offsetValue];
    let formatValue: string = this.formatValues[offsetValue];
    let maxTicksValue: number = this.maxTicksValues[offsetValue];

    let startDateValue: string = moment().subtract(numberValue, durationValue).format("x");
    let endDateValue: string = moment().format("x");

    let loadingOverlay = this.loadingCtrl.create({ content: 'Please wait...' });
    loadingOverlay.present();

    let coinMarketCapGraphsResponse: Observable<CoinMarketCapGraphsResponse> = (period === "ALL" ? this.coinMarketCapProvider.allPrices(this.cryptocurrency) : this.coinMarketCapProvider.allPricesBetween(this.cryptocurrency, startDateValue, endDateValue));
    coinMarketCapGraphsResponse.subscribe(result => {
      refreshChartCallback(refreshChart, chart, result, formatValue, maxTicksValue);

      loadingOverlay.dismiss();
    }, error => {
      console.error(error);
      this.toastCtrl.create({ message: 'An error occured...', duration: 3000, position: 'top' }).present();

      loadingOverlay.dismiss();
    });
  }

  private refreshUsdChart(refreshChart: Function, chart: Chart, coinMarketCapGraphsResponse: CoinMarketCapGraphsResponse, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, coinMarketCapGraphsResponse.price_usd, labelFormat, maxTicksValue);
  }

  private refreshBtcChart(refreshChart: Function, chart: Chart, coinMarketCapGraphsResponse: CoinMarketCapGraphsResponse, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, coinMarketCapGraphsResponse.price_btc, labelFormat, maxTicksValue);
  }

  private refreshMarketCapChart(refreshChart: Function, chart: Chart, coinMarketCapGraphsResponse: CoinMarketCapGraphsResponse, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, coinMarketCapGraphsResponse.market_cap_by_available_supply, labelFormat, maxTicksValue);
  }

  private refreshVolumesChart(refreshChart: Function, chart: Chart, coinMarketCapGraphsResponse: CoinMarketCapGraphsResponse, labelFormat: string, maxTicksValue: number): void {
    refreshChart(chart, coinMarketCapGraphsResponse.volume_usd, labelFormat, maxTicksValue);
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