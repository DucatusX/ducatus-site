import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Http2Service } from '../http/http2.service';

@Injectable({ providedIn: 'root' })

export class GoldLotteryService {

  constructor(private httpService: HttpService, private http2Service: Http2Service) { }

  public codeRegistrate(addressDuc: string, addressDucx: string, code: string) {
    return this.http2Service.post(`coin/`, { ducatus_address: addressDuc, ducatusx_address: addressDucx, secret_code: code }).toPromise();
  }

  public codeCheck(pubCode: string) {
    return this.http2Service.get(`coin/`, { public_code: pubCode }).toPromise();
  }

  public getValidateDucatusAddress(ducAddress: string) {
    return this.httpService.post(`validate_ducatus_address/`, { address: ducAddress }).toPromise();
  }

}
