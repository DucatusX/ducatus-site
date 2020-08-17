import { Component, OnInit, Input } from '@angular/core';
import { BuyService } from '../../../service/buy/buy.service';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';

export interface Players {
  id: number;
  address: string;
  lottery: number;
  received_duc_amount: number;
  sent_usd_amount: string;
  tickets_amount: number;
  tx_hash: string;
}

@Component({
  selector: 'app-buy',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})

export class TicketsComponent implements OnInit {
  public players: Players[] = [];

  public search = '';

  public filter = false;
  public sortData = {
    tickets_amount: true,
  } as any;

  public maxSize = 5;
  public directionLinks = true;
  public autoHide = false;
  public responsive = false;
  public config: PaginationInstance = {
      id: 'tickets-pagination',
      itemsPerPage: 10,
      currentPage: 1
  };
  public eventLog: string[] = [];

  private popped = [];

  constructor(
    private buyservice: BuyService,
  ) { }

  ngOnInit() {
    this.buyservice.getLotteryPlayers().then(res => {
      this.players = res;
    }).catch(err => console.error(err));
  }

  public onPageChange(value: number) {
    this.config.currentPage = value;
  }

  public onPageBoundsCorrection(value: number) {
      this.config.currentPage = value;
  }

  public pushItem() {
      const item = this.popped.pop() || 'new ticket';
      this.players.push(item);
  }

  public popItem() {
      this.popped.push(this.players.pop());
  }

  public sort(type: string) {
    this.sortData[type] && this.filter ? this.filter = false : this.filter = true;
    Object.keys(this.sortData).forEach(v => this.sortData[v] = v === type);

    this.players.sort((toSort1, toSort2) => {
      let sort1: any;
      let sort2: any;

      sort1 = toSort1[type];
      sort2 = toSort2[type];

      if (this.filter) {
        return sort1 > sort2 ? 1 : -1;
      } else {
        return sort1 < sort2 ? 1 : -1;
      }
    });
  }
}
