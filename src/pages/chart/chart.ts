import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { Cryptocurrency } from '../../entities/cryptocurrency';
import { CoinMarketCapResponse } from '../../responses/coinmarketcapresponse';

import { PriceCoinMarketCapProvider } from '../../providers/coinmarketcap/price/price';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  public static readonly buttonValues: Array<string> = ["1D", "7D", "1M", "3M", "1Y", "ALL"];
  public static readonly numberValues: Array<string> = ["1", "7", "1", "3", "1", null];
  public static readonly durationValues: Array<moment.unitOfTime.DurationConstructor> = ["d", "d", "M", "M", "y", null];
  public static readonly formatValues: Array<string> = ["HH", "DD", "DD", "MMM", "MMM YYYY", "MMM YYYY"];

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public priceCoinMarketCapProvider: PriceCoinMarketCapProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");

    this.usdPeriod = ChartPage.buttonValues[1];
    this.usdChartButtonDisabled = ChartPage.buttonValues[1];
    this.btcPeriod = ChartPage.buttonValues[1];
    this.btcChartButtonDisabled = ChartPage.buttonValues[1];
    this.marketCapPeriod = ChartPage.buttonValues[1];
    this.marketCapChartButtonDisabled = ChartPage.buttonValues[1];
    this.volumesPeriod = ChartPage.buttonValues[1];
    this.volumesChartButtonDisabled = ChartPage.buttonValues[1];
  }

  public ionViewDidEnter(): void {
    this.usdChart = new Chart(this.usdChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "USD",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });

    this.btcChart = new Chart(this.btcChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "BTC",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });

    this.marketCapChart = new Chart(this.marketCapChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "Market Cap",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });

    this.volumesChart = new Chart(this.volumesChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "Volumes",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      },
      options: {
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
    let offsetValue: number = ChartPage.buttonValues.indexOf(period);
    let numberValue: string = ChartPage.numberValues[offsetValue];
    let durationValue: moment.unitOfTime.DurationConstructor = ChartPage.durationValues[offsetValue];
    let formatValue: string = ChartPage.formatValues[offsetValue];  
    let startDateValue: string = moment().subtract(numberValue, durationValue).format("x");
    let endDateValue: string = moment().format("x");

    let observableResponse: Observable<CoinMarketCapResponse> = (numberValue != null && durationValue != null ? this.priceCoinMarketCapProvider.allPricesBetween(this.cryptocurrency, startDateValue, endDateValue) : this.priceCoinMarketCapProvider.allPrices(this.cryptocurrency));
    observableResponse.subscribe(data => {
      console.warn(data);

      refreshChartCallback(refreshChart, chart, data, formatValue);
    });
  }

  private refreshUsdChart(refreshChart: Function, chart: Chart, coinMarketCapResponse: CoinMarketCapResponse, labelFormat: string): void {
    refreshChart(chart, coinMarketCapResponse.price_usd, labelFormat);
  }

  private refreshBtcChart(refreshChart: Function, chart: Chart, coinMarketCapResponse: CoinMarketCapResponse, labelFormat: string): void {
    refreshChart(chart, coinMarketCapResponse.price_btc, labelFormat);
  }

  private refreshMarketCapChart(refreshChart: Function, chart: Chart, coinMarketCapResponse: CoinMarketCapResponse, labelFormat: string): void {
    refreshChart(chart, coinMarketCapResponse.market_cap_by_available_supply, labelFormat);
  }

  private refreshVolumesChart(refreshChart: Function, chart: Chart, coinMarketCapResponse: CoinMarketCapResponse, labelFormat: string): void {
    refreshChart(chart, coinMarketCapResponse.volume_usd, labelFormat);
  }

  private refreshChart(chart: Chart, values: Array<Array<number>>, labelFormat: string): void {
    // Remove existing data
    chart.data.labels = [];
    chart.data.datasets[0].data = [];

    // Add new data
    for (let offset = 0; offset < values.length; offset++) {
      chart.data.labels.push(moment(values[offset][0]).format(labelFormat));
      chart.data.datasets[0].data.push(values[offset][1]);
    }

    // Update the chart
    chart.update();
  }
}