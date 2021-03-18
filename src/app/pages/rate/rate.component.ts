import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RateService } from '../../service/rate/rate.service';
import { BigNumber } from 'bignumber.js';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  private ratio: string;
  public duc = new FormControl('');
  public ducx = new FormControl('');
  constructor(private rateService: RateService) {
    this.rateService
      .getRates()
      .then((res: any) => {
        this.duc.setValue(res.DUC.USD);
        this.ducx.setValue(res.DUCX.USD);
        this.ratio = new BigNumber(res.DUCX.USD).dividedBy(res.DUC.USD).toString();
      })
      .catch((res) => console.log(res, 'get rates'));
  }

  public changeAmount(e, currency): void {
    if (currency === 'duc') {
      if (this.duc.value < 1) {
        this.ducx.setValue(new BigNumber(this.duc.value).multipliedBy(this.ratio).toFixed().toString());
      } else {
        this.ducx.setValue(new BigNumber(this.duc.value).dividedBy(this.ratio).toFixed().toString());
      }
    } else {
      if (this.ducx.value < 1) {
        this.duc.setValue(new BigNumber(this.ducx.value).dividedBy(this.ratio).toFixed().toString());
      } else {
        this.duc.setValue(new BigNumber(this.ducx.value).multipliedBy(this.ratio).toFixed().toString());
      }
    }
    if (+this.duc.value && this.duc.value.toString().indexOf('.') !== '-1' && new BigNumber(this.duc.value).toFixed().toString().split('.')[1].length > 8) {
      const amount = new BigNumber(new BigNumber(+this.duc.value).toFixed(8)).toFixed();
      this.duc.setValue(amount);
    }
    if (+this.ducx.value && this.ducx.value.toString().indexOf('.') !== '-1' && new BigNumber(this.ducx.value).toFixed().toString().split('.')[1].length > 8) {
      const amount = new BigNumber(new BigNumber(+this.ducx.value).toFixed(8)).toFixed();
      this.ducx.setValue(amount);
    }
  }

  public setRates(): void {
    this.rateService
      .changeRates({
        DUC: +this.duc.value,
        DUCX: +this.ducx.value,
      })
      .then((res) => console.log(res, 'changeRates'))
      .catch((res) => console.log(res, 'changeRates'));
  }
}
