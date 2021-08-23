import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })
export class BuyService {
  constructor(private httpService: HttpService) {}

  public getAvailableSwap(): any {
    return this.httpService.get(`exchange/status/`, {}, 'api/v1/').toPromise();
  }

  public getRates(): any {
    return this.httpService.get(`rates/`).toPromise();
  }

  public getLimit(address): any {
    return this.httpService.post('transfers/', { address }, 'api/v1/').toPromise();
  }

  public getLottery(): any {
    return this.httpService.get(`lotteries/`).toPromise();
  }

  public getLotteryInfo(): any {
    const id = 7;
    return this.httpService.get(`lotteries/${id}/`).toPromise();
  }

  public getLotteryPlayers(loteryId, page): any {
    return this.httpService.get(`lotteries_players/?lottery_id=${loteryId}&page=${page}`).toPromise();
  }

  public getValidateDucatusAddress(address: string): any {
    return this.httpService.post(`validate_ducatus_address/`, { address }).toPromise();
  }

  public getCardLink(amount: number, currency: string, email: string): any {
    return this.httpService.post(`add_charge/`, { amount, currency, email }).toPromise();
  }

  public getExchange(toAddress: string, toCurrency: string, email: string): any {
    return this.httpService
      .post(`exchange/`, {
        email,
        to_address: toAddress,
        to_currency: toCurrency,
      })
      .toPromise();
  }
}
