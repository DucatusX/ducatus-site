import { Component, OnInit } from '@angular/core';
import { BuyService } from '../../../service/buy/buy.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-buy',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})

export class TicketsComponent implements OnInit {
  public players: [];

  constructor(
    private buyservice: BuyService,
  ) { }

  ngOnInit() {
    this.buyservice.getLotteryPlayers().then(res => this.players = res).catch(err => console.error(err));
  }
}
