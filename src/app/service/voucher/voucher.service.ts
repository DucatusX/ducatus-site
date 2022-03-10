import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  constructor(private httpService: HttpService, private http: HttpClient) {}

  public getVouchers(): any {
    return this.http.get( environment.api + 'admin/vouchers/'
    , { headers: {Authorization: `Token ${localStorage.getItem('token')}`}})
      .toPromise();
  }

  public sendVouchers(data): any {
    return this.httpService.post('vouchers/', data, 'api/v3/').toPromise();
  }

  public sendVoucher(data): any {
    return this.http.post( environment.api + 'admin/vouchers/', data,
    { headers: {Authorization: `Token ${localStorage.getItem('token')}`}} ).toPromise();
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
