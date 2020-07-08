/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VoucherService } from './voucher.service';

describe('Service: Buy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoucherService]
    });
  });

  it('should ...', inject([VoucherService], (service: VoucherService) => {
    expect(service).toBeTruthy();
  }));
});
