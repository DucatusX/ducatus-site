import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class RateService {
  constructor(private http: HttpClient, private httpService: HttpService) {}

  public getRates() {
    return this.http.get(`https://ducexpl.rocknblock.io/api/v1/rates/`).toPromise();
  }

  public changeRates(data: any) {
    return this.httpService.post('change_duc_rate', data, 'api/v3/').toPromise();
  }
}
