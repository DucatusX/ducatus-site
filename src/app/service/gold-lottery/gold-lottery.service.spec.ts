/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoldLotteryService } from './gold-lottery.service';

describe('Service: GoldLottery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoldLotteryService]
    });
  });

  it('should ...', inject([GoldLotteryService], (service: GoldLotteryService) => {
    expect(service).toBeTruthy();
  }));
});
