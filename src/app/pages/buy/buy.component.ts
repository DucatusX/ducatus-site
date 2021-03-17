import { BigNumber } from 'bignumber.js';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BuyAddresses, BuyRates } from 'src/app/interfaces/buy.interface';
import { BuyService } from 'src/app/service/buy/buy.service';
import { coinsFormSend, coinsFormGet, coins } from './parameters';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  host: { '(document:click)': 'onClick($event)' },
})
export class BuyComponent implements OnInit {
  @ViewChild('openFormGet') coinsGet: ElementRef;
  @ViewChild('openFormSend') coinsSend: ElementRef;

  public modal: boolean;
  public coins = coins;

  public rates: BuyRates;
  public addresses: BuyAddresses;

  public address: string;
  public checkAddress: boolean;
  public novalidAddress: boolean;

  public valueGet: any;
  public valueSend: any;
  public rateSend;

  public coinGet = 'DUC';
  public coinSend = 'DUCX';
  private prevCoinGet = 'DUC';
  public coinsFormGet = coinsFormGet;
  public coinsFormSend = coinsFormSend;

  public qr: string;

  constructor(private buyservice: BuyService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.cookieService.get('termsBuy') ? this.acceptModalTerms(true) : (this.modal = true);
  }

  private onClick($event: any): void {
    if ($($event.target).closest('.select-coin').length === 0) {
      this.coinsGet.nativeElement.checked = this.coinsSend.nativeElement.checked = false;
    }
  }

  public acceptModalTerms(start?: boolean): void {
    if (!start) {
      this.cookieService.set('termsBuy', 'true');
      this.modal = false;
    }

    this.buyservice.getRates().then((result: BuyRates) => {
      this.rates = result;
      this.rateSend = new BigNumber(this.rates[this.coinGet][this.coinSend]).toFixed();
    });
  }

  public changeGetCoin(getChange?: boolean): void {
    if (getChange) {
      this.coinSend = this.coinsFormSend[this.coinGet][0];
      this.addresses = null;
      this.address = '';
      this.coinsGet.nativeElement.checked = false;
      if (this.prevCoinGet !== this.coinGet) {
        this.prevCoinGet = this.coinGet;
        this.valueGet = null;
        this.valueSend = null;
      }
    } else {
      this.coinsSend.nativeElement.checked = false;
      this.amountGet();
    }
    this.rateSend = new BigNumber(this.rates[this.coinGet][this.coinSend]).toFixed();

    if (this.addresses) {
      this.setQr();
    }
  }

  private setQr(): void {
    this.qr = this.coins[this.coinSend].name.toLowerCase() + ':' + this.addresses[this.coins[this.coinSend].symbol.toLowerCase() + '_address'] + this.coins[this.coinSend].qrAmount + (this.valueSend ? this.valueSend.toFixed(this.coins[this.coinSend].decimal).toString() : '0');
  }

  public amountGet(): any {
    this.valueSend = new BigNumber(this.valueGet).multipliedBy(this.rates[this.coinGet][this.coinSend]).toFixed();
    if (this.addresses) {
      this.setQr();
    }
  }

  public amountSend(): any {
    this.valueGet = new BigNumber(this.valueSend).div(this.rates[this.coinGet][this.coinSend]).toFixed();
    if (this.addresses) {
      this.setQr();
    }
  }

  public setAddress(): void {
    this.novalidAddress = false;

    switch (this.coinGet) {
      case 'DUC':
        if (this.address.length === 34 && ['L', 'l', 'M', 'm'].includes(this.address.substring(0, 1))) {
          this.checkAddress = true;

          this.buyservice.getValidateDucatusAddress(this.address).then((result: boolean) => {
            result ? this.getAddresses() : (this.novalidAddress = true);
          });
        } else {
          this.novalidAddress = true;
        }
        break;

      case 'DUCX':
        if (this.address.length === 42) {
          this.checkAddress = true;

          if (!/0x[0-9a-fA-F]{40}/.test(this.address)) {
            this.novalidAddress = true;
            return;
          }
          $.trim(this.address) === '' || $.trim(this.address).length < 15 ? (this.novalidAddress = true) : this.getAddresses();
        } else {
          this.novalidAddress = true;
        }
        break;

      default:
        this.novalidAddress = true;
    }

    this.checkAddress = false;
  }

  public getAddresses(): void {
    this.buyservice.getExchange(this.address, this.coinGet, 'email@email.com').then((result: BuyAddresses) => {
      this.addresses = result;
      this.setQr();
    });
  }
}
