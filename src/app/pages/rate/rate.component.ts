import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
    if (this[currency].value && this[currency].value.toString().indexOf('.') !== '-1') {
      this[currency].setValue(+this[currency].value.toFixed(8));
    }
    if (currency === 'duc') {
      this.ducx.setValue(new BigNumber(this.duc.value).multipliedBy(this.ratio).toString());
    } else {
      this.duc.setValue(new BigNumber(this.ducx.value).multipliedBy(this.ratio).toString());
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
