import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })

export class VoucherService {

  constructor(private httpService: HttpService) { }

  public getVouchers() {
    return this.httpService.get(`vouchers/`).toPromise();
  }

  public sendVouchers(vouchers: object) {
    return this.httpService.post(`vouchers/`, {
      data: vouchers
    }).toPromise();
  }

  public getVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/`).toPromise();
  }

  public setVoucher(id: number, voucher: object) {
    return this.httpService.get(`vouchers/${id}/`, {
      data: voucher
    }).toPromise();
  }

  public updateVoucher(id: number, voucher: object) {
    return this.httpService.get(`vouchers/${id}/`, {
      data: voucher
    }).toPromise();
  }

  public deleteVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/`).toPromise();
  }
}