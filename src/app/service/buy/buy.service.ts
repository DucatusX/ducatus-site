import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })

export class BuyService {

  constructor(private httpService: HttpService) { }

  public getRates() {
    return this.httpService.get(`rates/`).toPromise();
  }

  public getLottery() {
    return this.httpService.get(`lotteries/`).toPromise();
  }

  public getValidateDucatusAddress(duc_address: string) {
    return this.httpService.post(`validate_ducatus_address/`, { address: duc_address }).toPromise();
  }

  public getExchange(address: string, currency: string, toEmail: string) {
    return this.httpService.post(`exchange/`, {
      to_address: address,
      to_currency: currency,
      email: toEmail
    }).toPromise();
  }
}
