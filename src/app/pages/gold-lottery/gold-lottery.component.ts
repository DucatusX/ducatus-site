import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gold-lottery',
  templateUrl: './gold-lottery.component.html',
  styleUrls: ['./gold-lottery.component.scss']
})
export class GoldLotteryComponent implements OnInit {

  public registration = true;
  public registrationStep: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
