import { BigNumber } from 'bignumber.js';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BuyAddresses, BuyRates } from 'src/app/interfaces/buy.interface';
import { BuyService } from 'src/app/service/buy/buy.service';
import { coinsFormSend, coinsFormGet, coins } from './parameters';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  // host: { '(document:click)': 'onClick($event)' },
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

  public valueGet = new FormControl('');
  public valueSend = new FormControl('');
  public rateSend;

  public coinGet = 'DUC';
  public coinSend = 'DUCX';
  private prevCoinGet = 'DUC';
  public coinsFormGet = coinsFormGet;
  public coinsFormSend = coinsFormSend;
  private dayDucLimit: any;
  private weekDucLimit;
  private isAvailableDucSwap = true;
  public isAvailableSwap = true;

  public qr: string;

  constructor(private buyservice: BuyService, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.dayDucLimit = '25000';
    this.cookieService.get('termsBuy') ? this.acceptModalTerms(true) : (this.modal = true);

    this.buyservice
      .getAvailableSwap()
      .then((res: boolean) => {
        this.isAvailableDucSwap = res;
        if (this.coinGet === 'DUCX' && this.coinSend === 'DUC') {
          if (!this.isAvailableDucSwap) {
            this.isAvailableSwap = false;
          } else {
            this.isAvailableSwap = true;
          }
        } else {
          this.isAvailableSwap = true;
        }
      })
      .catch(() => {
        this.isAvailableDucSwap = false;
      });
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
        this.valueGet.setValue(null);
        this.valueSend.setValue(null);
      }
    } else {
      this.coinsSend.nativeElement.checked = false;
      this.amountGet();
    }
    this.rateSend = new BigNumber(this.rates[this.coinGet][this.coinSend]).toFixed();

    if (this.addresses) {
      this.setQr();
    }
    if (this.coinGet === 'DUCX' && this.coinSend === 'DUC') {
      if (!this.isAvailableDucSwap) {
        this.isAvailableSwap = false;
      } else {
        this.isAvailableSwap = true;
      }
    } else {
      this.isAvailableSwap = true;
    }
  }

  private setQr(): void {
    this.qr = this.coins[this.coinSend].name.toLowerCase() + ':' + this.addresses[this.coins[this.coinSend].symbol.toLowerCase() + '_address'] + this.coins[this.coinSend].qrAmount + (this.valueSend.value ? this.valueSend.value.toFixed(this.coins[this.coinSend].decimal).toString() : '0');
  }

  public amountGet(): any {
    if (this.coinGet === 'DUCX') {
      const valueSend = new BigNumber(this.valueGet.value).multipliedBy(this.rates[this.coinGet][this.coinSend]).toFixed();
      if (+this.weekDucLimit === 0) {
        this.valueSend.setValue(0);
        this.valueGet.setValue(0);
        return;
      }
      if (this.dayDucLimit && +valueSend > +this.dayDucLimit) {
        this.valueSend.setValue(this.dayDucLimit);
        this.amountSend();
      } else {
        this.valueSend.setValue(valueSend);
      }
    } else {
      this.valueSend.setValue(new BigNumber(this.valueGet.value).multipliedBy(this.rates[this.coinGet][this.coinSend]).toFixed());
    }
    if (this.addresses) {
      this.setQr();
    }
  }

  public amountSend(): any {
    if (this.coinSend === 'DUC' && +this.weekDucLimit === 0) {
      this.valueSend.setValue(0);
      this.valueGet.setValue(0);
      return;
    }
    if (this.dayDucLimit && this.coinSend === 'DUC' && +this.valueSend.value > +this.dayDucLimit) {
      this.valueSend.setValue(+this.dayDucLimit);
    }
    this.valueGet.setValue(new BigNumber(this.valueSend.value).div(this.rates[this.coinGet][this.coinSend]).toFixed());
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
          if ($.trim(this.address) === '' || $.trim(this.address).length < 15) {
            this.novalidAddress = true;
          } else {
            this.buyservice
              .getLimit(this.address)
              .then((res) => {
                this.dayDucLimit = new BigNumber(res.daily_available).dividedBy(new BigNumber(10).pow(8)).toFixed();
                this.weekDucLimit = new BigNumber(res.weekly_available).dividedBy(new BigNumber(10).pow(8)).toFixed();
                if (+this.valueSend.value > +this.dayDucLimit || +this.weekDucLimit === 0) {
                  this.amountGet();
                }
                this.getAddresses();
              })
              .catch(() => {
                this.novalidAddress = true;
              });
          }
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
