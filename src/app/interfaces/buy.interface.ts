export interface BuyRates {
  DUC: {
    BTC: number;
    ETH: number;
    DUCX: number;
    USDC: number;
  };
  DUCX: {
    DUC: number;
  };
}

export interface BuyAddresses {
  btc_address: string;
  ducx_address: string;
  eth_address: string;
  duc_address: string;
}

export interface BuyCoins {
  [index: string]: BuyCoinsInfo;
}

interface BuyCoinsInfo {
  name: string;
  symbol: string;
  icon: string;
  wait: string;
  qrAmount: string;
  decimal: number;
}

export interface IUserAccount {
  address: string;
  network: { name: string; chainID: number };
  type: string;
}
