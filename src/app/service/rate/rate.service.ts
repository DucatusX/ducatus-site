import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class RateService {
  constructor(private http: HttpClient, private httpService: HttpService) {}

  public getRates(): any {
    const rateUrl = window.location.hostname === 'ducatuscoins.com' ? `https://rates.ducatuscoins.com/api/v1/rates/` : `https://ducexpl.rocknblock.io/api/v1/rates/`;
    return this.http.get(rateUrl).toPromise();
  }

  public changeRates(data: any): any {
    return this.httpService.post('change_duc_rate', data, 'api/v3/').toPromise();
  }
}
