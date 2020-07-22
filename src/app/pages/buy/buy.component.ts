import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { BuyService } from '../../service/buy/buy.service';
import { Lottery, Rates } from 'src/app/interfaces';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'src/app/service/gtag/google-analytics.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})

export class BuyComponent implements OnInit, OnDestroy {

  public BuyGroup: FormGroup;
  public loadingQr = true;
  public loadingData = true;
  public loadedAddress = false;
  public modal = false;
  public modalInfo = false;
  public modalAccept = false;
  private checker;
  public bg: string;
  public percentLottery = 0;
  public lang = 'eng';
  public onLangChange: any;

  public referralAddressError = false;
  public referralAddress: string;
  public referralLink: string;
  public referralIncoming: string;

  public currencyData = {
    eth: {
      name: 'Ethereum',
      shortName: 'eth',
      time: {
        eng: '15 minutes',
        deu: '15 Minuten',
        ita: '15 minuti',
        vie: '15 phút',
      },
      address: '',
      amount: null,
      info: ''
    },
    btc: {
      name: 'Bitcoin',
      shortName: 'btc',
      time: {
        eng: '1 hour',
        deu: '1 Stunde',
        ita: '1 ora',
        vie: '1 giờ',
      },
      address: '',
      amount: null,
      info: ''
    }
  };

  public lottery: Lottery = {
    name: '',
    description: [],
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
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private googleAnalyticsService: GoogleAnalyticsService,
    protected route: ActivatedRoute
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

  ngOnInit() {
    window['jQuery']['cookie']('termsBuy') ? this.acceptModalTerms() : this.modal = true;

    const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];
    const langToSet = window['jQuery']['cookie']('lng') || (['deu', 'eng', 'vie', 'ita'].includes(defaultLng) ? defaultLng : 'eng');

    this.lang = langToSet;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    console.log(this.lang);

    this.route.queryParams.subscribe((params) => {
      this.referralIncoming = params['referral'];
    });

    if (this.referralIncoming) { console.log('you use referral link: ', this.referralIncoming); window['jQuery']['cookie']('referral', this.referralIncoming); }
  }

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
    this.getAddresses();
  }

  private checkDucatusAddress(address: string) {
    return this.buyservice.getValidateDucatusAddress(address);
  }

  public setAddress() {
    const address = this.BuyGroup.value.address;

    if (address.length === 34 && ['L', 'l', 'M', 'm'].includes(address.substring(0, 1))) {
      this.currencyData['eth'].address = this.currencyData['btc'].address = '';
      this.loadedAddress = false;
      this.checkDucatusAddress(address).then((result) => {
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

      const amountBTC = ((this.BuyGroup.value.amount / 0.05 * this.rates.DUC.BTC).toFixed(8));
      const amountETH = ((this.BuyGroup.value.amount / 0.05 * this.rates.DUC.ETH).toFixed(18));

      this.currencyData['btc'].amount = parseFloat(amountBTC);
      this.currencyData['eth'].amount = parseFloat(amountETH);

      this.currencyData['btc'].info = this.currencyData['btc'].name.toLowerCase() + ':' + this.currencyData['btc'].address; // + '?amount=' + this.currencyData['btc'].amount;
      this.currencyData['eth'].info = this.currencyData['eth'].name.toLowerCase() + ':' + this.currencyData['eth'].address; // + '?value=' + this.currencyData['eth'].amount.split('.').join('');

      this.googleAnalyticsService.eventEmitter('get_lotetry_address', 'lottery', 'address', 'generate', 10);

      this.loadingQr = false;
    } else {
      this.loadingQr = true;

      if (type !== 'amount') {
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
      this.percentLottery = percent;

      Number(percent) >= 100 ? this.lottery.percent = '100%' : this.lottery.percent = percent.toString().substr(0, 5) + '%';
    }).catch(err => console.error(err));

    if (!this.lottery.winner_address) {
      this.checker = setTimeout(() => {
        if (this.checker) { this.checkLotteryStatus(); }
      }, 10000);
    } else { this.checker = undefined; }
  }

  public generateReferralLink() {

    if (this.referralAddress.length === 34 && ['L', 'l', 'M', 'm'].includes(this.referralAddress.substring(0, 1))) {
      this.referralAddressError = false;
      this.referralLink = '';
      this.checkDucatusAddress(this.referralAddress).then((result) => {
        if (result.address_valid) {
          this.referralAddressError = false;
          this.referralLink = 'http://ducsite.rocknblock.io/buy?referral=' + this.referralAddress;
        } else { this.referralAddressError = true; }
      }).catch(err => { console.error(err); });
    } else { this.referralAddressError = true; this.referralLink = ''; }

  }

  public acceptModalTerms() {
    window['jQuery']['cookie']('termsBuy', true);
    this.modal = false;
    this.checkLotteryStatus();

    this.buyservice.getRates().then((result) => {
      this.rates = result;
      this.loadingData = false;
    }).catch(err => {
      setTimeout(() => {
        this.acceptModalTerms();
      }, 5000);
      console.error(err);
    });
  }
}
