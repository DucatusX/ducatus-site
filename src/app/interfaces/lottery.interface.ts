export interface Rates {
  DUC: {
    ETH: number;
    BTC: number;
    DUCX: number;
    USDC: number;
  };
  DUCX: {
    DUC: number;
  };
}

export interface Lottery {
  id?: number;
  name: string;
  description?: any[];
  image: string;
  duc_amount: any;
  sent_duc_amount: any;
  started_at: any;
  ended: any;
  percent?: any;
  range?: number;
  winner?: string;
  gave_tickets_amount?: number;
  video?: string;
  winner_address?: string;
  winner_tx_hash?: string;
  filled_at?: any;
  winners_data?: any;
}
