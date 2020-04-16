import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gold-lottery',
  templateUrl: './gold-lottery.component.html',
  styleUrls: ['./gold-lottery.component.scss']
})
export class GoldLotteryComponent implements OnInit {

  public registration = true;
  public registrationStep = 0;

  public code1 = '';
  public code2 = '';
  public code3 = '';
  public code4 = '';

  constructor() { }

  ngOnInit() {
  }

}
