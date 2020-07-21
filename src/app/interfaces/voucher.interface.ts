export interface IVoucher {
  id: number;
  publish_date: string;
  voucher_code: string;
  activation_code: string;
  usd_amount: number;
  is_active: boolean;
  is_used: boolean;
  lock_days?: number;
  activation_date?: string;
  isProgress?: boolean;
  isProgressBtn?: boolean;
  progressText?: string;
}
