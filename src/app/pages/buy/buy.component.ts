import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BuyService } from '../../service/buy/buy.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

const f = x => ((x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0));

export interface Rates {
  DUC: {
    ETH: number;
    BTC: number;
    DUCX: number;
  };
  DUCX: {
    DUC: number;
  };
}

export interface Addresses {
  btc_address: string;
  ducx_address: string;
  eth_address: string;
  duc_address: string;
}

export interface Lottery {
  id?: number;
  name: string;
  description: string;
  image: string;
  usd_amount: any;
  received_usd_amount: any;
  started_at: any;
  ended: any;
  percent?: any;
  range?: number;
  winner?: string;
  gave_tickets_amount?: number;
}
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

  public currencyData = {
    eth: {
      name: 'Ethereum',
      shortName: 'eth',
      time: '40 minutes',
      address: '',
      amount: 0,
      info: ''
    },
    btc: {
      name: 'Bitcoin',
      shortName: 'btc',
      time: '1 hour',
      address: '',
      amount: 0,
      info: ''
    }
  };

  public lottery: Lottery = {
    name: '',
    description: 'info',
    image: '',
    usd_amount: '',
    received_usd_amount: '',
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

  get ducAddress() {
    return this.BuyGroup.get('address');
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
      this.currencyData['btc'].amount = this.BuyGroup.value.amount / 0.05 * this.rates.DUC.BTC;
      this.currencyData['eth'].amount = this.BuyGroup.value.amount / 0.05 * this.rates.DUC.ETH;

      console.log('BTC:', this.currencyData['btc'].amount, 'ETH:', this.currencyData['eth'].amount);

      this.currencyData['btc'].info = this.currencyData['btc'].name.toLowerCase() + ':' + this.currencyData['btc'].address + '?amount=' + this.currencyData['btc'].amount;
      this.currencyData['eth'].info = this.currencyData['eth'].name.toLowerCase() + ':' + this.currencyData['eth'].address + '?amount=' + this.currencyData['eth'].amount;

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

  public acceptModalTerms() {
    this.modal = false;

    this.buyservice.getLottery().then((result) => {
      this.lottery = result[0];
      const percent = 100 * Number(this.lottery.received_usd_amount) / Number(this.lottery.usd_amount);
      console.log(Number(percent).toFixed(2));
      if (Number(percent.toFixed(0)) >= 100) {

        console.log('Lottery finished');

        const dateEnded = new Date(this.lottery.ended);
        const dateNow = new Date();
        const days = Math.ceil(Math.abs(dateNow.getTime() - dateEnded.getTime()) / (1000 * 3600 * 24));

        console.log('Days to get winner: ', days);

        days > 8 ? this.lottery.range = 0 : this.lottery.range = days;
        this.lottery.percent = '100%';
      }
      else { this.lottery.percent = percent.toFixed(2) + '%'; }


    }).catch(err => console.error(err));

    this.buyservice.getRates().then((result) => {
      this.rates = result;
      this.loadingData = false;
    }).catch(err => { console.error(err); });
  }

  ngOnInit() { }

}
