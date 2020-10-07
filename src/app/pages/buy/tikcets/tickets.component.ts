import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  public players: Players[] = [];

  public search = '';

  public currentPageSave = 1;
  public currentPageSaveState = false;

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
    currentPage: 1,
  };
  public eventLog: string[] = [];

  private popped = [];

  constructor(private buyservice: BuyService) {}

  ngOnInit() {
    this.buyservice
      .getLotteryPlayers(1, 1)
      .then((res) => {
        this.players = res.results;
      })
      .catch((err) => console.error(err));
  }

  public onPageChange(value: number) {
    this.config.currentPage = value;
    this.startScrollTo('tickets');
  }

  public startScrollTo(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth' });
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

  public searchChange(event: string) {
    if (event !== '' && !this.currentPageSaveState) {
      this.currentPageSave = this.config.currentPage;
      this.currentPageSaveState = true;
    }

    if (event !== '') {
      this.config.currentPage = 1;
    } else {
      this.config.currentPage = this.currentPageSave;
      this.currentPageSaveState = false;
    }
  }

  public sort(type: string) {
    this.sortData[type] && this.filter
      ? (this.filter = false)
      : (this.filter = true);
    Object.keys(this.sortData).forEach((v) => (this.sortData[v] = v === type));

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
