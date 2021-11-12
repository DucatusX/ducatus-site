import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  constructor(private httpService: HttpService) {}

  public getVouchers(): any {
    return this.httpService.get(`vouchers/`, null, 'api/v3/').toPromise();
  }

  public sendVouchers(data): any {
    return this.httpService.post('vouchers/', data, 'api/v3/').toPromise();
  }

  public sendVoucher(data): any {
    return this.httpService.post('vouchers/', data, 'api/v3/').toPromise();
  }

  public getVoucher(id: number): any {
    return this.httpService.get(`vouchers/${id}/ `, null, 'api/v3/').toPromise();
  }

  public setVoucher(id, data): any {
    return this.httpService.put(`vouchers/${id}/`, data, 'api/v3/').toPromise();
  }

  public updateVoucher(id: number, voucher: object): any {
    return this.httpService
      .get(
        `vouchers/${id}/ `,
        {
          data: voucher,
        },
        'api/v3/'
      )
      .toPromise();
  }

  public deleteVoucher(id: number): any {
    return this.httpService.get(`vouchers/${id}/`, null, 'api/v3/').toPromise();
  }
}
