import { Injectable } from '@angular/core';
import { Http3Service } from '../http/http3.service';

@Injectable({ providedIn: 'root' })

export class VoucherService {

  constructor(private httpService: Http3Service) { }

  public getVouchers() {
    return this.httpService.get(`vouchers/`).toPromise();
  }

  public sendVouchers(data) {
    return this.httpService.post('vouchers/', data).toPromise();
  }

  public sendVoucher(data) {
    return this.httpService.post('vouchers/', data).toPromise();
  }

  public getVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/ `).toPromise();
  }

  public setVoucher(id, data) {
    return this.httpService.put(`vouchers/${id}/`, data).toPromise();
  }

  public updateVoucher(id: number, voucher: object) {
    return this.httpService.get(`vouchers/${id}/ `, {
      data: voucher
    }).toPromise();
  }

  public deleteVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/`).toPromise();
  }
}