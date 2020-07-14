import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { BuyService } from '../../service/buy/buy.service';
import { Lottery, Rates } from 'src/app/interfaces';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})

export class BuyComponent implements OnInit {

  public BuyGroup: FormGroup;
  public loadingQr = true;
  public loadingData = true;
  public loadedAddress = false;
  public modal = true;
  public modalAccept = false;
  private checker;
  public bg = 'assets/img/sections/buy-bg.png';

  public currencyData = {
    eth: {
      name: 'Ethereum',
      shortName: 'eth',
      time: '15 minutes',
      address: '',
      amount: null,
      info: ''
    },
    btc: {
      name: 'Bitcoin',
      shortName: 'btc',
      time: '1 hour',
      address: '',
      amount: null,
      info: ''
    }
  };

  public lottery: Lottery = {
    name: '',
    description: 'info',
    image: '',
    duc_amount: '',
    sent_duc_amount: '',
    started_at: 0,
    ended: false,
  };

  public rates: Rates = {
    DUC: {
      ETH: 0.00046189,
      BTC: 0.00001040,
      DUCX: 0.10000000
    },
    DUCX: {
      DUC: 10.00000000
    }
  };

  constructor(
    private buyservice: BuyService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.BuyGroup = this.formBuilder.group({
      currency: [
        'eth',
        Validators.compose([Validators.required])
      ],
      amount: [
        '100',
        Validators.compose([Validators.required])
      ],
      address: [
        '',
        Validators.compose([Validators.minLength(34), Validators.maxLength(34), Validators.required])
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ]
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.checker = undefined;
  }

  get ducAddress() {
    return this.BuyGroup.get('address');
  }

  get lotteryVideoUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.lottery.video);
  }

  public setAmount() {
    this.setQrAddress('amount');
  }

  public setEmail() {
    const email = this.BuyGroup.controls['email'].valid;
    console.log(email);
    this.getAddresses();
  }

  public setAddress() {
    const address = this.BuyGroup.value.address;

    if (address.length === 34 && ['L', 'l', 'M', 'm'].includes(address.substring(0, 1))) {
      console.log('setAddress');
      this.currencyData['eth'].address = this.currencyData['btc'].address = '';
      this.loadedAddress = false;
      this.buyservice.getValidateDucatusAddress(address).then((result) => {
        if (result.address_valid) {
          this.getAddresses();
          this.BuyGroup.controls['address'].setErrors(null);
        } else { this.BuyGroup.controls['address'].setErrors({ 'incorrect': true }); }
      }).catch(err => { console.error(err); });
    } else { this.BuyGroup.controls['address'].setErrors({ 'incorrect': true }); }

    this.setQrAddress();
  }

  public getAddresses() {
    const address = this.BuyGroup.value.address;
    const addressValid = this.BuyGroup.controls['address'].valid;
    const email = this.BuyGroup.value.email;

    console.log('address: ', addressValid);

    if (addressValid) {
      this.buyservice.getExchange(address, 'DUC', email).then((result) => {
        this.loadedAddress = true;
        this.currencyData['eth'].address = result.eth_address;
        this.currencyData['btc'].address = result.btc_address;
        this.setQrAddress();
        this.BuyGroup.controls['address'].setErrors(null);
      }).catch(err => { console.error(err); this.loadedAddress = false; });
    } else {
      this.BuyGroup.controls['address'].setErrors({ 'incorrect': true });
      this.BuyGroup.controls['address'].markAsTouched();
    }
  }

  public setQrAddress(type?) {
    const email = this.BuyGroup.controls['email'].valid;
    const address = this.BuyGroup.controls['address'].valid;

    if (email && address && this.loadedAddress && !this.loadingData) {
      this.loadingQr = true;

      this.currencyData['btc'].amount = ((this.BuyGroup.value.amount / 0.05 * this.rates.DUC.BTC).toFixed(8)).toString();
      this.currencyData['eth'].amount = ((this.BuyGroup.value.amount / 0.05 * this.rates.DUC.BTC).toFixed(18)).toString();

      console.log('BTC:', this.currencyData['btc'].amount, 'ETH:', this.currencyData['eth'].amount);

      this.currencyData['btc'].info = this.currencyData['btc'].name.toLowerCase() + ':' + this.currencyData['btc'].address + '?amount=' + this.currencyData['btc'].amount;
      this.currencyData['eth'].info = this.currencyData['eth'].name.toLowerCase() + ':' + this.currencyData['eth'].address + '?value=' + this.currencyData['eth'].amount.split('.').join('');

      this.loadingQr = false;
    } else {
      this.loadingQr = true;

      if (type != 'amount') {
        if (!email || !address) {
          this.BuyGroup.controls['address'].setErrors({ 'incorrect': true });
          this.BuyGroup.controls['address'].markAsTouched();
        }
      }
    }
  }

  private checkLotteryStatus() {
    this.buyservice.getLottery().then((result) => {
      this.lottery = result[0];

      this.bg = this.lottery.image ? this.lottery.image : 'assets/img/sections/buy-bg.png';

      const percent = 100 * Number(this.lottery.sent_duc_amount) / Number(this.lottery.duc_amount);
      Number(percent.toFixed(0)) >= 100 ? this.lottery.percent = '100%' : this.lottery.percent = percent.toFixed(2) + '%';
    }).catch(err => console.error(err));

    if (!this.lottery.winner_address) {
      this.checker = setTimeout(() => {
        if (this.checker) { this.checkLotteryStatus(); }
      }, 10000);
    } else { this.checker = undefined; }
  }

  public acceptModalTerms() {
    this.modal = false;
    this.checkLotteryStatus();

    this.buyservice.getRates().then((result) => {
      this.rates = result;
      this.loadingData = false;
    }).catch(err => { console.error(err); });
  }
}
