import { BuyCoins } from 'src/app/interfaces/buy.interface';

export const coinsFormGet = ['DUC', 'DUCX'];

export const coinsFormSend = {
  DUC: ['DUCX', 'ETH', 'BTC'],
  DUCX: ['DUC'],
};

export const coins: BuyCoins = {
  DUC: { name: 'Ducatus', symbol: 'DUC', icon: 'duc', wait: '10 min', qrAmount: '?value=', decimal: 18 },
  DUCX: { name: 'DucatusX', symbol: 'DUCX', icon: 'duc', wait: '10 min', qrAmount: '?value=', decimal: 18 },
  ETH: { name: 'Ethereum', symbol: 'ETH', icon: 'eth', wait: '40 min', qrAmount: '?value=', decimal: 18 },
  BTC: { name: 'Bitcoin', symbol: 'BTC', icon: 'btc', wait: '60 min', qrAmount: '?amount=', decimal: 8 },
  USDC: { name: 'USDC', symbol: 'USDC', icon: 'usdc', wait: '10 min', qrAmount: '?value=', decimal: 18 },
};
