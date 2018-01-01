import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { Cryptocurrency } from '../../entities/cryptocurrency';

import { PriceCoinMarketCapProvider } from '../../providers/coinmarketcap/price/price';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  @ViewChild('usdChart') usdChart;
  @ViewChild('btcChart') btcChart;

  public cryptocurrency: Cryptocurrency;
  public usdLabels: Array<string> = [];
  public usdPrices: Array<number> = [];
  public btcLabels: Array<string> = [];
  public btcPrices: Array<number> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public priceCoinMarketCapProvider: PriceCoinMarketCapProvider) {
    this.cryptocurrency = this.navParams.get("cryptocurrency");
  }

  public ionViewDidEnter(): void {
    this.usdChart = new Chart(this.usdChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.usdLabels,
        datasets: [
          {
            label: "USD price",
            data: this.usdPrices,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      }
    });

    this.btcChart = new Chart(this.btcChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.btcLabels,
        datasets: [
          {
            label: "BTC price",
            data: this.btcPrices,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }
        ]
      }
    });

    this.priceCoinMarketCapProvider.allPrices(this.cryptocurrency).subscribe(data => {
      console.warn(data);

      this.refreshUsdData(data.price_usd);
      this.refreshBtcData(data.price_btc);
    });
  }

  public refreshUsdData(usdPrices: Array<Array<number>>): void {
    this.usdLabels = [];
    this.usdPrices = [];

    for (let offset = 0; offset < usdPrices.length; offset++) {
      this.usdLabels.push(moment(usdPrices[offset][0]).format("MMM YYYY"));
      this.usdPrices.push(usdPrices[offset][1]);
    }

    // Remove existing data
    this.usdChart.data.labels.pop();
    this.usdChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });

    // Add new data
    this.usdLabels.forEach(usdLabel => {
      this.usdChart.data.labels.push(usdLabel);
    });
    this.usdPrices.forEach(usdPrice => {
      this.usdChart.data.datasets[0].data.push(usdPrice);
    });

    this.usdChart.update();
  }

  public refreshBtcData(btcPrices: Array<Array<number>>): void {
    this.btcLabels = [];
    this.btcPrices = [];

    for (let offset = 0; offset < btcPrices.length; offset++) {
      this.btcLabels.push(moment(btcPrices[offset][0]).format("MMM YYYY"));
      this.btcPrices.push(btcPrices[offset][1]);
    }

    // Remove existing data
    this.btcChart.data.labels.pop();
    this.btcChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });

    // Add new data
    this.btcLabels.forEach(btcLabel => {
      this.btcChart.data.labels.push(btcLabel);
    });
    this.btcPrices.forEach(btcPrice => {
      this.btcChart.data.datasets[0].data.push(btcPrice);
    });

    this.btcChart.update();
  }
}