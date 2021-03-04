import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  public rateGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.rateGroup = this.formBuilder.group({
      duc: [5490, Validators.compose([Validators.required])],
      ducx: [549, Validators.compose([Validators.required])],
    });
  }

  public setRates(): void {}
}
