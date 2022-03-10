export interface IVoucher {
  id: number;
  activationCode: string;
  usdAmount: number;
  lockDays?: number;
  activation_date?: string;
  isProgress?: boolean;
  isProgressBtn?: boolean;
  progressText?: string;
}
