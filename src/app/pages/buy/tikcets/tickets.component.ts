import { Component, OnInit } from '@angular/core';
import { BuyService } from '../../../service/buy/buy.service';

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
  public players: Players[];
  public playersPagination: any;

  public filter = false;
  public sortData = {
    tickets_amount: true,
  } as any;

  public search = '';

  private paginationMap = {};
  public currentPage = 0;
  public countOnPage = 10;
  public countNow = 0;

  public paginationCount = [];
  public paginationCountMap = {};
  public paginationCountMapUse: any;
  public pgPage = 0;
  public pgOnPage = 5;
  public pgNow = 0;
  public pg = {
    prev: 0,
    next: 1
  };

  constructor(
    private buyservice: BuyService,
  ) { }

  ngOnInit() {
    this.buyservice.getLotteryPlayers().then(res => {
      this.players = res;

      const paginationPages = Number((this.players.length / 10).toFixed(0)) + 1;
      for (let index = 1; index < paginationPages + 1; index++) {
        this.paginationCount.push(index);
        Object.assign(this.paginationMap, {[index]: {from: this.countNow, to: index === paginationPages ? this.players.length : this.countNow + this.countOnPage }});
        this.countNow = this.countNow + this.countOnPage;
      }

      const pgPages = Number((this.paginationCount.length / 5).toFixed(0)) + 1;
      for (let index = 1; index < pgPages + 1; index++) {
        Object.assign(this.paginationCountMap, {[index]: {from: this.pgNow, to: index === pgPages ? this.paginationCount.length : this.pgNow + this.pgOnPage }});
        this.pgNow = this.pgNow + this.pgOnPage;
      }
      this.pgNow = pgPages;

      this.paginationSwitch(1);
      this.paginationSwitchRange(1);
    }
      ).catch(err => console.error(err));
  }

  public paginationSwitch(count?) {
    this.search = '';
    if (count) { this.currentPage = count; }
    this.playersPagination = this.players.slice(this.paginationMap[this.currentPage].from, this.paginationMap[this.currentPage].to);
  }

  public paginationSwitchRange(count, type?) {
    if (type === 'prev') {
      this.pg.next = count;
      this.pg.prev = this.pg.next;
    }

    console.log('before', this.pgPage);
    const value = Number(this.pgPage + count);
    this.pgPage = value > 0 ? value : 1;
    console.log('after', this.pgPage);
    this.paginationCountMapUse = this.paginationCount.slice(this.paginationCountMap[this.pgPage].from, this.paginationCountMap[this.pgPage].to);
  }

  public findAddress(search) {
    if (search === '') {this.paginationSwitch(); }
    else {
      const searchAddress =  this.players.filter(x => {
        if (x.tx_hash.indexOf(search) > 0) { return x; }
      });

      this.playersPagination = searchAddress ? searchAddress.length !== 0 ? searchAddress : [searchAddress] : [];
    }
  }

  public sort(type: string) {
    this.sortData[type] && this.filter ? this.filter = false : this.filter = true;
    Object.keys(this.playersPagination).forEach(v => this.playersPagination[v] = v === type);

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

    this.paginationSwitch(this.currentPage);
  }
}
