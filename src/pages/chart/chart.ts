import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  @ViewChild('chart') chart;

  public cryptocurrency: Cryptocurrency;
  public period: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public priceCoinMarketCapProvider: PriceCoinMarketCapProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
    this.period = "7d";
  }

  public ionViewDidEnter(): void {
    this.chart = new Chart(this.chart.nativeElement, {
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
          },
          {
            label: "USD",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          },
          {
            label: "BTC",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          },
          {
            label: "Volume",
            data: [],
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      }
    });

    this.refreshData();
  }

  public ionViewDidLeave(): void {
    this.chart.destroy();
  }

  public onRefreshChartButtonClicked(): void {
    this.refreshData();
  }

  public onRefreshChart(period: string): void {
    this.period = period;
    this.refreshData();
  }

  public refreshData(): void {
    let periodNumber: string = this.period.match(/\d+/g).join();
    let periodUnit: moment.unitOfTime.DurationConstructor = this.convertToDuration(this.period.charAt(this.period.length - 1));

    if (periodUnit != null) {
      let startDate: string = moment().subtract(periodNumber, periodUnit).format("x");
      let endDate: string = moment().format("x");

      console.log(endDate);

      this.priceCoinMarketCapProvider.allPricesBetween(this.cryptocurrency, startDate, endDate).subscribe(data => {
        console.warn(data);
  
        this.refreshChart(data);
      });
    } else {
      this.priceCoinMarketCapProvider.allPrices(this.cryptocurrency).subscribe(data => {
        console.warn(data);
  
        this.refreshChart(data);
      });
    }
  }

  public convertToDuration(unit: string): moment.unitOfTime.DurationConstructor {
    switch (unit) {
      case "s":
        return 's';
      case "m":
        return 'm';
      case "h":
        return 'h';
      case "d":
        return 'd';
      case "M":
        return 'M';
      case "y":
        return 'y';
      default:
        return null;
    }
  }

  public refreshChart(coinMarketCapResponse: CoinMarketCapResponse): void {
    // Remove existing data
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    this.chart.data.datasets[1].data = [];
    this.chart.data.datasets[2].data = [];
    this.chart.data.datasets[3].data = [];

    // Recover new data
    let marketCap: Array<Array<number>> = coinMarketCapResponse.market_cap_by_available_supply;
    let usd: Array<Array<number>> = coinMarketCapResponse.price_usd;
    let btc: Array<Array<number>> = coinMarketCapResponse.price_btc;
    let volume: Array<Array<number>> = coinMarketCapResponse.volume_usd;

    // Add new data
    for (let offset = 0; offset < marketCap.length; offset++) {
      this.chart.data.labels.push(moment(marketCap[offset][0]).format("MMM YYYY"));
      this.chart.data.datasets[0].data.push(marketCap[offset][1]);
      this.chart.data.datasets[1].data.push(usd[offset][1]);
      this.chart.data.datasets[2].data.push(btc[offset][1]);
      this.chart.data.datasets[3].data.push(volume[offset][1]);
    }

    // Update the chart
    this.chart.update();
  }
}