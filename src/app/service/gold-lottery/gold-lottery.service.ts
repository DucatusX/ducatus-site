import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })

export class GoldLotteryService {

  constructor(private httpService: HttpService) { }

  public codeRegistrate(addressDuc: string, addressDucx: string, code: string) {
    return this.httpService.post(`coin/`, { ducatus_address: addressDuc, ducatusx_address: addressDucx, secret_code: code }, 'api/v2/').toPromise();
  }

  public codeCheck(pubCode: string) {
    return this.httpService.get(`coin/`, { public_code: pubCode }, 'api/v2/').toPromise();
  }

  public getValidateDucatusAddress(ducAddress: string) {
    return this.httpService.post(`validate_ducatus_address/`, { address: ducAddress }).toPromise();
  }

}
