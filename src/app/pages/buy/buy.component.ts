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
}
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})

export class BuyComponent implements OnInit {

  public BuyGroup: FormGroup;
  public loadingAddress = false;
  public loadingAddressQr = false;
  public loadingData = true;
  public modal = true;
  public modalAccept = false;

  public currencyData = {
    eth: {
      name: 'Etherium',
      shortName: 'eth',
      time: '40 minutes',
      address: ''
    },
    btc: {
      name: 'Bitcoin',
      shortName: 'btc',
      time: '1 hour',
      address: ''
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

  public setAddress() {

    const address = this.BuyGroup.value.address;

    if (address.length === 34 && ['L', 'l', 'M', 'm'].includes(address.substring(0, 1))) {
      this.loadingAddress = true;
      this.loadingAddressQr = false;

      this.buyservice.getValidateDucatusAddress(address).then((result) => {
        if (result.address_valid) {
          this.getAddresses(address);
        }
        else {
          this.BuyGroup.controls['address'].setErrors({ 'incorrect': true });
          this.currencyData['eth'].address = this.currencyData['btc'].address = '';
        }

        this.loadingAddress = false;
      }).catch(err => {
        console.error(err);
        this.loadingAddress = this.loadingAddressQr = false;
      });

    } else {
      this.BuyGroup.controls['address'].setErrors({ 'incorrect': true });
      this.currencyData['eth'].address = this.currencyData['btc'].address = '';
      this.loadingAddress = this.loadingAddressQr = false;
    }
  }

  public getAddresses(address?) {
    this.loadingAddress = true;

    this.buyservice.getExchange(address, 'DUC').then((result) => {
      console.log('address result', result);
      this.loadingAddress = false;

      this.currencyData['eth'].address = result.eth_address;
      this.currencyData['btc'].address = result.btc_address;

      this.loadingAddressQr = true;

    }).catch(err => { console.error(err); this.loadingAddress = this.loadingAddressQr = false; });
  }

  public acceptModalTerms() {
    this.modal = false;

    this.buyservice.getLottery().then((result) => {
      this.lottery = result[0];
      this.lottery.percent = (100 * parseInt(this.lottery.received_usd_amount) / parseInt(this.lottery.usd_amount)).toString() + '%';
    }).catch(err => console.error(err));

    this.buyservice.getRates().then((result) => {
      this.rates = result;
      this.loadingData = false;
    }).catch(err => { console.error(err); });
  }

  ngOnInit() { }

}
