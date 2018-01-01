export interface CoinMarketCapResponse {

  market_cap_by_available_supply: Array<Array<number>>;
  price_btc: Array<Array<number>>;
  price_usd: Array<Array<number>>;
  volume_usd: Array<Array<number>>;
}