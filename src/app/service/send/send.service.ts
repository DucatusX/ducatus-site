import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({ providedIn: 'root' })

export class SendService {

  constructor(private httpService: HttpService) { }

  public sendContactMessage(data) {
    return this.httpService.post(`send_ducatus_feedback/`, data).toPromise();
  }

}
