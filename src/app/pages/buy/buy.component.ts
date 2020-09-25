import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { BuyService } from '../../service/buy/buy.service';
import { Lottery, Rates } from 'src/app/interfaces';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'src/app/service/gtag/google-analytics.service';
import { ActivatedRoute } from '@angular/router';

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
  public loadingCard = false;
  public modal = false;
  public modalInfo = false;
  public modalWinner = false;
  public modalAccept = false;

  private checker;

  public bg: string;
  public percentLottery = 0;
  public lang = 'eng';
  public onLangChange: any;
  public savedEmail: string;
  public savedAddress: string;
  public cardRedirect = '';
  public buttonSubmit = false;

  public referralAddressError = false;
  public referralAddress: string;
  public referralLink: string;
  public referralIncoming: string;

  public ducToUsd = 0.05;
  public selectedMoney = 'usd';

  public winners = [];

  public currencyTemplate = [
    { name: 'Card', displayName: 'credit card', shortName: 'card' },
    { name: 'USDC', displayName: 'usdc', shortName: 'usdc' },
    { name: 'Bitcoin', displayName: 'btc', shortName: 'btc' },
    { name: 'Ethereum', displayName: 'eth', shortName: 'eth' }
  ];

  public moneyTemplate = [
    { name: '$, USD', currency: 'usd' },
    { name: '€, EUR', currency: 'eur' },
    { name: '£, GBP', currency: 'gbp' },
    { name: '₣, CHF', currency: 'chf' },
  ];

  public moneyPrice = {
    usd: { name: 'USD', price: '0.05' },
    eur: { name: 'EUR', price: '0.042' },
    gbp: { name: 'GBP', price: '0.038' },
    chf: { name: 'CHF', price: '0.046' },
  };

  public priceTemplate = [
    {
      usd: { postition: 'after', sign: '$', price: 10 },
      eur: { postition: 'before', sign: '€', price: 8.46 },
      gbp: { postition: 'before', sign: '£', price: 7.62 },
      chf: { postition: 'after', sign: '₣', price: 9.10 },
      ticket: 1
    },
    {
      usd: { postition: 'after', sign: '$', price: 50 },
      eur: { postition: 'before', sign: '€', price: 42.31 },
      gbp: { postition: 'before', sign: '£', price: 38.08 },
      chf: { postition: 'after', sign: '₣', price: 45.51 },
      ticket: 6
    },
    {
      usd: { postition: 'after', sign: '$', price: 100 },
      eur: { postition: 'before', sign: '€', price: 84.62 },
      gbp: { postition: 'before', sign: '£', price: 76.19 },
      chf: { postition: 'after', sign: '₣', price: 91.03 },
      ticket: 13
    },
    {
      usd: { postition: 'after', sign: '$', price: 500 },
      eur: { postition: 'before', sign: '€', price: 423.09 },
      gbp: { postition: 'before', sign: '£', price: 380.82 },
      chf: { postition: 'after', sign: '₣', price: 455.15 },
      ticket: 70
    },
    {
      usd: { postition: 'after', sign: '$', price: 1000 },
      eur: { postition: 'before', sign: '€', price: 846.17 },
      gbp: { postition: 'before', sign: '£', price: 761.63 },
      chf: { postition: 'after', sign: '₣', price: 910.29 },
      ticket: 150
    },
  ];

  public currencyData = {
    eth: {
      name: 'Ethereum',
      qrName: 'Ethereum',
      shortName: 'eth',
      decimals: 18,
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
      qrName: 'Bitcoin',
      shortName: 'btc',
      decimals: 8,
      time: {
        eng: '1 hour',
        deu: '1 Stunde',
        ita: '1 ora',
        vie: '1 giờ',
      },
      address: '',
      amount: null,
      info: ''
    },
    usdc: {
      name: 'USDC',
      qrName: 'Ethereum',
      shortName: 'usdc',
      decimals: 18,
      time: {
        eng: '15 minutes',
        deu: '15 Minuten',
        ita: '15 minuti',
        vie: '15 phút',
      },
      address: '',
      amount: null,
      info: ''
    }
  };

  public rates: Rates = {
    DUC: {
      ETH: 0.00046189,
      BTC: 0.00001040,
      DUCX: 0.10000000,
      USDC: 0.06000000
    },
    DUCX: {
      DUC: 10.00000000
    }
  };

  public lottery: Lottery = {
    name: '',
    image: '',
    duc_amount: '',
    sent_duc_amount: '',
    started_at: 0,
    ended: false,
    winners_data: []
  };

  public lotteryDesc: any = {
    description: []
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
      money: [
        'usd',
        Validators.compose([Validators.required])
      ],
      amount: [
        100,
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
    const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];
    const langToSet = window['jQuery']['cookie']('lng') || (['deu', 'eng', 'vie', 'ita'].includes(defaultLng) ? defaultLng : 'eng');

    this.lang = langToSet;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    this.route.queryParams.subscribe((params) => {
      if (params['referral']) { window['jQuery']['cookie']('referral', params['referral']); }
    });

    window['jQuery']['cookie']('termsBuy') ? this.acceptModalTerms() : this.modal = true;
  }

  ngOnDestroy() {
    this.checker = undefined;
  }

  public countdownEvent(state) {
    this.lottery.ended = state;
  }

  get ducAddress() {
    return this.BuyGroup.get('address');
  }

  get lotteryVideoUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.lottery.video);
  }

  public setCurrency() {
    // this.selectedMoney = this.BuyGroup.controls['money'].value;
    this.selectedMoney = 'usd';
    this.cardRedirect = '';
  }

  public setAmount() {
    this.cardRedirect = '';

    if (this.BuyGroup.controls['currency'].value !== 'card') {
      this.BuyGroup.controls['money'].setValue('usd');
    }


    if (this.BuyGroup.controls['currency'].value === 'card') {
      this.BuyGroup.controls['address'].setErrors(null);
      this.buttonSubmit = false;
    }

    this.setQrAddress('amount');
  }

  public setEmail() {
    const email = this.BuyGroup.controls['email'];
    if (email.value !== this.savedEmail) {
      this.buttonSubmit = false;
    }
  }

  public clickSubmit() {
    const email = this.BuyGroup.controls['email'];
    const address = this.BuyGroup.controls['address'];

    if (email.valid) {
      this.savedEmail = email.value;
    }

    if (address.valid) {
      this.savedAddress = address.value;
    }

    if (email.valid && address.valid) {
      this.buttonSubmit = true;
      this.getAddresses();
      this.referralAddress = address.value;
      this.generateReferralLink();
    }
  }

  private checkDucatusAddress(address: string) {
    return this.buyservice.getValidateDucatusAddress(address);
  }

  public setAddress() {
    const address = this.BuyGroup.controls['address'];

    if (this.BuyGroup.controls['currency'].value === 'card') {
      this.BuyGroup.controls['address'].setErrors(null);
      return;
    }

    if (address.value.length === 34 && ['L', 'l', 'M', 'm'].includes(address.value.substring(0, 1))) {
      this.currencyData['eth'].address = this.currencyData['btc'].address = '';
      this.loadedAddress = false;
      this.checkDucatusAddress(address.value).then((result) => {
        if (result.address_valid) {
          this.BuyGroup.controls['address'].setErrors(null);
        } else { this.BuyGroup.controls['address'].setErrors({ 'incorrect': true }); this.referralAddress = ''; this.generateReferralLink(); }
      }).catch(err => { console.error(err); });
    } else { this.BuyGroup.controls['address'].setErrors({ 'incorrect': true }); this.referralAddress = ''; this.generateReferralLink(); }

    if (address.value !== this.savedAddress) {
      this.buttonSubmit = false;
    }
  }

  public getAddresses() {
    const address = this.BuyGroup.controls['address'];
    const email = this.BuyGroup.controls['email'];

    if (address.valid && email.valid) {
      this.buyservice.getExchange(address.value, 'DUC', email.value).then((result) => {
        this.loadedAddress = true;
        this.currencyData['eth'].address = result.eth_address;
        this.currencyData['btc'].address = result.btc_address;
        this.currencyData['usdc'].address = result.eth_address;
        this.setQrAddress();
        this.BuyGroup.controls['address'].setErrors(null);
        this.BuyGroup.controls['email'].setErrors(null);
      }).catch(err => { console.error(err); this.loadedAddress = false; });
    } else {
      if (!address.valid) {
        this.BuyGroup.controls['address'].setErrors({ 'incorrect': true });
        this.BuyGroup.controls['address'].markAsTouched();
      }
      if (!email.valid) {
        this.BuyGroup.controls['email'].setErrors({ 'incorrect': true });
        this.BuyGroup.controls['email'].markAsTouched();
      }
    }
  }

  public setQrAddress(type?) {
    const email = this.BuyGroup.controls['email'].valid;
    const address = this.BuyGroup.controls['address'].valid;

    if (email && address && this.loadedAddress && !this.loadingData) {
      this.loadingQr = true;

      const currency = this.BuyGroup.controls['currency'].value;
      const amount = Number((this.BuyGroup.value.amount / this.ducToUsd * this.rates.DUC[this.currencyData[currency].shortName.toUpperCase()]).toFixed(this.currencyData[currency].decimals)) + 0.00005;

      this.currencyData[currency].amount = (Math.ceil((amount) * 10000) / 10000 + 0.00001).toFixed(5);
      this.currencyData[currency].info = this.currencyData[currency].qrName.toLowerCase() + ':' + this.currencyData[currency].address;

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
    this.buyservice.getLotteryInfo().then((result) => {
      this.lottery = result;

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
          this.referralLink = window.location.origin + '/buy?referral=' + this.referralAddress;
        } else { this.referralAddressError = true; }
      }).catch(err => { console.error(err); });
    } else { this.referralAddressError = true; this.referralLink = ''; }
  }

  public cardLink() {
    const amount = this.BuyGroup.controls['amount'];
    const currency = this.BuyGroup.controls['money'];
    const email = this.BuyGroup.controls['email'];

    const address = this.BuyGroup.controls['currency'].value !== 'card' ? this.BuyGroup.controls['address'] : { value: 'null' };

    this.loadingCard = true;

    this.buyservice.getCardLink(amount.value, currency.value.toUpperCase(), address.value, email.value).then(res => {
      if (res.redirect_url) {
        window.open(res.redirect_url, '_blank');
        this.cardRedirect = res.redirect_url;
      }
      this.loadingCard = false;
    }).catch(err => {
      console.log(err);
      this.loadingCard = false;
    });
  }

  public acceptModalTerms() {
    window['jQuery']['cookie']('termsBuy', true);
    this.modal = false;

    this.buyservice.getLottery().then((result) => {
      this.lotteryDesc = result[0];
      this.bg = this.lotteryDesc.image ? this.lotteryDesc.image : 'assets/img/sections/buy-bg.png';

      if (this.lotteryDesc && this.lotteryDesc.winners_data) {

        let count = 0;

        this.lotteryDesc.winners_data.map(value => {
          value['deu'] = this.lotteryDesc.description.deu.prizes[count];
          value['eng'] = this.lotteryDesc.description.eng.prizes[count];
          value['vie'] = this.lotteryDesc.description.vie.prizes[count];
          value['ita'] = this.lotteryDesc.description.ita.prizes[count];
          count++;
          this.winners.push(value);
        });

        console.log(this.lotteryDesc);
        console.log(this.winners);

        this.modalWinner = true;
      }

      this.checkLotteryStatus();
    });

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
