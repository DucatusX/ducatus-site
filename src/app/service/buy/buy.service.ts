import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class BuyService {
  constructor(private httpService: HttpService) {}

  public getRates() {
    return this.httpService.get(`rates/`).toPromise();
  }

  public getLottery() {
    return this.httpService.get(`lotteries/`).toPromise();
  }

  public getLotteryInfo() {
    const id = 7;
    return this.httpService.get(`lotteries/${id}/`).toPromise();
  }

  public getLotteryPlayers(loteryId, page) {
    return this.httpService
      .get(`lotteries_players/?lottery_id=${loteryId}&page=${page}`)
      .toPromise();
  }

  public getValidateDucatusAddress(address: string) {
    return this.httpService
      .post(`validate_ducatus_address/`, { address })
      .toPromise();
  }

  public getCardLink(amount: number, currency: string, email: string) {
    return this.httpService
      .post(`add_charge/`, { amount, currency, email })
      .toPromise();
  }

  public getExchange(currency: string, toEmail: string) {
    return this.httpService
      .post(`exchange/`, {
        to_currency: currency,
        email: toEmail,
      })
      .toPromise();
  }
}
