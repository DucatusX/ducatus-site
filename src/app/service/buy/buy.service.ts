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

  public getLotteryInfo() {
    return this.httpService.get(`get_lotteries_info/`).toPromise();
  }

  public getLotteryPlayers() {
    return this.httpService.get(`lotteries_players/`).toPromise();
  }

  public getValidateDucatusAddress(address: string) {
    return this.httpService.post(`validate_ducatus_address/`, { address }).toPromise();
  }

  public getCardLink(amount: number, currency: string, duc_address: string, email: string) {
    return this.httpService.post(`add_charge/`, { amount, currency, duc_address, email }).toPromise();
  }

  public getExchange(address: string, currency: string, toEmail: string) {
    return this.httpService.post(`exchange/`, {
      to_address: address,
      to_currency: currency,
      email: toEmail
    }).toPromise();
  }
}
