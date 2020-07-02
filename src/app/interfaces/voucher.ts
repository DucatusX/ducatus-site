export interface IVoucher {
  id: number;
  publish_date: string;
  voucher_code: string;
  activation_code: string;
  duc_amount: number;
  is_active: boolean;
  is_used: boolean;
  activation_date?: string;
  isProgress?: boolean;
  isProgressBtn?: boolean;
  progressText?: string;
}
