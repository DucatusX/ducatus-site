import { BigNumber } from 'bignumber.js';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BuyAddresses, BuyRates, IUserAccount } from 'src/app/interfaces/buy.interface';
import { BuyService } from 'src/app/service/buy/buy.service';
import { coinsFormSend, coinsFormGet, coins } from './parameters';
import { FormControl } from '@angular/forms';
import { ConnectWalletService } from 'src/app/service/connect-wallet/connect-wallet.service';
import { deNormalizedValue } from 'src/app/helper';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(document:click)': 'onClick($event)' },
})
export class BuyComponent implements OnInit {
  @ViewChild('openFormGet') coinsGet: ElementRef;
  @ViewChild('openFormSend') coinsSend: ElementRef;
  @ViewChild('acceptTerms') acceptTerms: ElementRef;

  public modal: boolean;
  public modalConnect = false;
  public coins = coins;

  public swapProgress = false;
  public swapModal = false;

  public userAccount: IUserAccount;

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

  constructor(private buyservice: BuyService, private cookieService: CookieService, private connectWalletService: ConnectWalletService) {}

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
    if ($($event.target).closest('.select-coin').length === 0 && $($event.target).closest('.input-checkbox-group').length === 0) {
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

  public initWalletConnect(name = 'MetaMask', chain = 'BinanceSmartChain'): void {
    this.connectWalletService.initWalletConnect(name, chain).then((res) => {
      console.log('initWalletConnect: ', res);

      this.connectWalletService.getAccount({}).then((account: IUserAccount) => {
        console.log('account', account);
        this.modalConnect = false;
        this.userAccount = account;
      });
    });
  }

  public swap(): void {
    if (isNaN(+this.valueSend.value) || +this.valueSend.value <= 0 || this.address === '' || this.novalidAddress) {
      console.log(isNaN(+this.valueSend.value), +this.valueSend.value <= 0, this.address === '', this.novalidAddress);
      return;
    }
    this.swapProgress = true;

    const amount = deNormalizedValue('Token', this.valueSend.value);

    this.connectWalletService
      .swapWDUCXtoDUCX(6, amount, this.address, this.userAccount.address)
      .then(
        (res) => {
          console.log('swap():', res);
          this.swapModal = true;
          this.address = '';
          this.valueSend.setValue(0);
          this.valueGet.setValue(0);
        },
        (err) => {
          console.log('swap() error:', err);
        }
      )
      .finally(() => (this.swapProgress = false));
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

    this.rateSend = this.coinSend === 'WDUCX' ? 1 : new BigNumber(this.rates[this.coinGet][this.coinSend]).toFixed();

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
    const rate = this.coinSend === 'WDUCX' ? 1 : this.rates[this.coinGet][this.coinSend];
    if (this.coinGet === 'DUCX') {
      const valueSend = new BigNumber(this.valueGet.value).multipliedBy(rate).toFixed();
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
      this.valueSend.setValue(new BigNumber(this.valueGet.value).multipliedBy(rate).toFixed());
    }
    if (this.addresses) {
      this.setQr();
    }
  }

  public amountSend(): any {
    const rate = this.coinSend === 'WDUCX' ? 1 : this.rates[this.coinGet][this.coinSend];

    if (this.coinSend === 'DUC' && +this.weekDucLimit === 0) {
      this.valueSend.setValue(0);
      this.valueGet.setValue(0);
      return;
    }
    if (this.dayDucLimit && this.coinSend === 'DUC' && +this.valueSend.value > +this.dayDucLimit) {
      this.valueSend.setValue(+this.dayDucLimit);
    }
    this.valueGet.setValue(new BigNumber(this.valueSend.value).div(rate).toFixed());
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
          this.buyservice.getValidateDucatusAddress(this.address).then((result) => {

            if(result.address_valid){
              this.getAddresses()
            }else{
              this.novalidAddress=true
            }
          });
        } else {
          this.novalidAddress = true;
          this.addresses = null
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
            if (this.coinSend !== 'WDUCX') {
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
          }
        } else {
          this.novalidAddress = true;
        }

        // if(this.coinSend === 'WDUCX') {
        //   this.canSwap = true;
        // }

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
