import { Component, OnInit } from '@angular/core';
import { BuyService } from '../../service/buy/buy.service';

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
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})

export class BuyComponent implements OnInit {

  private addresses: Addresses = {
    btc_address: '',
    ducx_address: '',
    eth_address: '',
    duc_address: ''
  };

  private rates: Rates = {
    DUC: {
      ETH: 0.00046189,
      BTC: 0.00001040,
      DUCX: 0.10000000
    },
    DUCX: {
      DUC: 10.00000000
    }
  };

  public loadingData = false;
  public modal = true;
  public modalAccept = false;

  public exchange = {
    address: {
      to: null,
      error: false,
      loading: false,
      validate: false,
      qr: false
    },
    rate: this.rates.DUC.DUCX,
    price: {
      get: null,
      send: null,
      select: 'get'
    },
    select: {
      get: false,
      send: false
    },
    selected: {
      get: { name: 'DUC', fullname: 'Ducatus', icon: 'duc', active: true },
      send: { name: 'DUCX', fullname: 'DucatusX', icon: 'duc', rate: 0, active: false, address: this.addresses.ducx_address, text: '10 min', }
    },
    coins: [
      {
        name: 'DUC',
        fullname: 'Ducatus',
        icon: 'duc',
        active: true,
        coins: [
          { name: 'BTC', fullname: 'Bitcoin', icon: 'btc', rate: this.rates.DUC.BTC, active: false, address: this.addresses.btc_address, text: '1 hour', },
          { name: 'ETH', fullname: 'Etherium', icon: 'eth', rate: this.rates.DUC.ETH, active: false, address: this.addresses.eth_address, text: '40 min', },
          { name: 'DUCX', fullname: 'DucatusX', icon: 'duc', rate: this.rates.DUC.DUCX, active: true, address: this.addresses.ducx_address, text: '10 min', }
        ]
      },
      {
        name: 'DUCX',
        fullname: 'DucatusX',
        icon: 'duc',
        active: false,
        coins: [
          { name: 'DUC', fullname: 'Ducatus', icon: 'duc', rate: this.rates.DUCX.DUC, active: true, address: this.addresses.duc_address, text: '10 min' }
        ]
      }
    ]
  };

  constructor(
    private buyservice: BuyService
  ) { }

  private onClick($event) {
    if ($($event.target).closest('.select-coin').length === 0) {
      if ($('.select-coin').hasClass('select-coin-start')) {
        this.exchange.select.get = false;
        this.exchange.select.send = false;
      }
    }

    if ($($event.target).hasClass('select-coin-list-item')) {
      this.exchange.select.get = false;
      this.exchange.select.send = false;
    }

    if ($($event.target).parent().hasClass('select-coin-list-item')) {
      this.exchange.select.get = false;
      this.exchange.select.send = false;
    }
  }

  public setAddress() {
    if (this.exchange.address.to) {

      switch (this.exchange.selected.get.name) {
        case 'DUC':
          if (this.exchange.address.to.length === 34 && ['L', 'l', 'M', 'm'].includes(this.exchange.address.to.substring(0, 1))) {

            this.exchange.address.validate = true;
            this.exchange.address.loading = true;

            this.buyservice.getValidateDucatusAddress(this.exchange.address.to).then((result) => {
              if (result) { this.exchange.address.error = false; }
              else { this.exchange.address.error = true; }
              this.exchange.address.validate = false;
              this.getAddresses();
              console.log('address result', result);
            }).catch(err => { console.log('something went wrong...', err); this.exchange.address.validate = false; });

          } else { this.exchange.address.error = true; }
          break;

        case 'DUCX':
          if (this.exchange.address.to.length === 42) {

            const reg = /0x[0-9a-fA-F]{40}/;
            const inputstr = this.exchange.address.to;

            if (!reg.test(inputstr)) { this.exchange.address.error = true; return; }
            if (($.trim(inputstr) == '') || ($.trim(inputstr).length < 15)) { this.exchange.address.error = true; }
            else { this.exchange.address.error = false; this.getAddresses(); }

          } else { this.exchange.address.error = true; }
          break;

        default: this.exchange.address.error = true;
      }

    } else { this.exchange.address.error = false; }

  }

  public getAddresses() {
    this.exchange.address.loading = true;

    this.buyservice.getExchange(this.exchange.address.to, this.exchange.selected.get.name).then((result) => {
      this.addresses = result;

      switch (this.exchange.selected.get.name) {
        case 'DUC':
          this.exchange.coins[0].coins[0].address = this.addresses.btc_address;
          this.exchange.coins[0].coins[1].address = this.addresses.eth_address;
          this.exchange.coins[0].coins[2].address = this.addresses.ducx_address;
          break;
        case 'DUCX':
          this.exchange.coins[1].coins[0].address = this.addresses.duc_address;
          break;
      }

      this.exchange.address.loading = false;
      this.exchange.address.qr = true;
      console.log('address result', this.addresses, result);
    }).catch(err => { console.log('something went wrong...', err); this.exchange.address.loading = false; });
  }

  public setCurrentPrice(type: string) {
    let price;
    let count;

    this.exchange.price.select = type;

    switch (type) {
      case 'get':
        price = this.exchange.price.get * this.exchange.rate;
        count = f(price);
        if (price !== 0) {
          if (count === 0) {
            this.exchange.price.send = price;
          } else { this.exchange.price.send = price.toFixed(count); }
        } else { this.exchange.price.send = null; }
        break;
      case 'send':
        price = this.exchange.price.get * this.exchange.rate;
        count = f(price);
        if (price !== 0) {
          if (count === 0) {
            this.exchange.price.get = price;
          } else { this.exchange.price.get = price.toFixed(count); }
        } else { this.exchange.price.get = null; }
        break;
    }
  }

  public coinSwitch(name: string, type: string) {
    let rate: number;

    switch (type) {
      case 'get':
        this.exchange.coins.map((item) => {
          item.active = item.name === name;
          if (item.active) {
            this.exchange.selected.get = item;
            this.exchange.selected.send = item.coins.find(coin => coin.active === true);
            rate = item.coins.find(coin => coin.active === true).rate || 0;
          }
        });
        this.exchange.address.loading = false;
        this.exchange.address.validate = false;
        this.exchange.address.qr = false;
        this.exchange.address.to = null;
        this.exchange.coins[0].coins[0].address = '';
        this.exchange.coins[0].coins[1].address = '';
        this.exchange.coins[0].coins[2].address = '';
        this.exchange.coins[1].coins[0].address = '';
        break;
      case 'send':
        this.exchange.coins.map((item) => {
          if (item.active) {
            item.coins.map((coin) => {
              coin.active = coin.name === name;
              if (coin.active) {
                this.exchange.selected.send = coin;
                rate = coin.rate;
              }
            });
          }
        });
        break;
    }

    this.exchange.rate = rate;
    this.setCurrentPrice(this.exchange.price.select);
  }

  public acceptModalTerms() {
    this.modal = false;

    this.buyservice.getRates().then((result) => {
      this.rates = result;
      this.loadingData = false;

      this.exchange = {
        address: {
          to: null,
          error: false,
          loading: false,
          validate: false,
          qr: false
        },
        rate: this.rates.DUC.DUCX,
        price: {
          get: null,
          send: null,
          select: 'get'
        },
        select: {
          get: false,
          send: false
        },
        selected: {
          get: { name: 'DUC', fullname: 'Ducatus', icon: 'duc', active: true },
          send: { name: 'DUCX', fullname: 'DucatusX', icon: 'duc', rate: 0, active: false, address: this.addresses.ducx_address, text: '10 min', }
        },
        coins: [
          {
            name: 'DUC',
            fullname: 'Ducatus',
            icon: 'duc',
            active: true,
            coins: [
              { name: 'BTC', fullname: 'Bitcoin', icon: 'btc', rate: this.rates.DUC.BTC, active: false, address: this.addresses.btc_address, text: '1 hour', },
              { name: 'ETH', fullname: 'Etherium', icon: 'eth', rate: this.rates.DUC.ETH, active: false, address: this.addresses.eth_address, text: '40 min', },
              { name: 'DUCX', fullname: 'DucatusX', icon: 'duc', rate: this.rates.DUC.DUCX, active: true, address: this.addresses.ducx_address, text: '10 min', }
            ]
          },
          {
            name: 'DUCX',
            fullname: 'DucatusX',
            icon: 'duc',
            active: false,
            coins: [
              { name: 'DUC', fullname: 'Ducatus', icon: 'duc', rate: this.rates.DUCX.DUC, active: true, address: this.addresses.duc_address, text: '10 min' }
            ]
          }
        ]
      };

      console.log('rates result', this.rates, this.exchange);
    }).catch(err => { console.log('something went wrong...', err); });
  }

  ngOnInit() {
    this.loadingData = true;
  }

}
