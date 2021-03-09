import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RateService } from '../../service/rate/rate.service';
import { BigNumber } from 'bignumber.js';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  public rateGroup: FormGroup;
  private ratio: string;
  constructor(private formBuilder: FormBuilder, private rateService: RateService) {
    this.rateService
      .getRates()
      .then((res: any) => {
        this.rateGroup = this.formBuilder.group({
          duc: [res.DUC.USD, Validators.compose([Validators.required])],
          ducx: [res.DUCX.USD, Validators.compose([Validators.required])],
        });
        this.ratio = new BigNumber(res.DUCX.USD).dividedBy(res.DUC.USD).toString();
      })
      .catch((res) => console.log(res, 'get rates'));
  }

  changeAmount(currency): void {
    if (currency === 'duc') {
      this.rateGroup.value.ducx = new BigNumber(this.rateGroup.value.duc).multipliedBy(this.ratio).toString();
    } else {
      this.rateGroup.value.duc = new BigNumber(this.rateGroup.value.ducx).dividedBy(this.ratio).toString();
    }
  }

  public setRates(): void {
    this.rateService
      .changeRates({
        DUC: +this.rateGroup.value.duc,
        DUCX: +this.rateGroup.value.ducx,
      })
      .then((res) => console.log(res, 'changeRates'))
      .catch((res) => console.log(res, 'changeRates'));
  }
}
