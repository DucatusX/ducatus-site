import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })

export class VoucherService {

  constructor(private httpService: HttpService) { }

  public getVouchers() {
    return this.httpService.get(`vouchers/`, null, 'api/v3/').toPromise();
  }

  public sendVouchers(data) {
    return this.httpService.post('vouchers/', data, 'api/v3/').toPromise();
  }

  public sendVoucher(data) {
    return this.httpService.post('vouchers/', data, 'api/v3/').toPromise();
  }

  public getVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/ `, null, 'api/v3/').toPromise();
  }

  public setVoucher(id, data) {
    return this.httpService.put(`vouchers/${id}/`, data, 'api/v3/').toPromise();
  }

  public updateVoucher(id: number, voucher: object) {
    return this.httpService.get(`vouchers/${id}/ `, {
      data: voucher
    }, 'api/v3/').toPromise();
  }

  public deleteVoucher(id: number) {
    return this.httpService.get(`vouchers/${id}/`, null, 'api/v3/').toPromise();
  }
}
