import { Papa } from 'ngx-papaparse';
import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher/voucher.service';
import { IVoucher } from 'src/app/interfaces';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})

export class VoucherComponent implements OnInit {
  public updateVouchersTable = false;
  public changeSort = true;

  public sortData = {
    id: true,
    addDate: false,
    addTime: false,
    voucherCode: false,
    activateCode: false,
    usdAmount: false,
    freezeDays: false,
    active: false,
    used: false,
    activatedDate: false
  } as any;

  public popupAdd = false;
  public pupopInProgress = false;
  public popupInProgressBtn = false;
  public popupInProgressText = 'in progress, please wait...';

  public popupModal = false;
  public infoModalTitle: string;
  public infoModalText: string;

  public cvsFile: any;
  public loadingCSV = false;
  private jsonCSV: any;

  public activationCode = null;
  public voucherCode = null;
  public lockDays = null;
  public usdAmount = null;
  public isActive = false;

  public vouchers = [] as IVoucher[];

  constructor(
    private papa: Papa,
    private voucherService: VoucherService
  ) {
  }

  ngOnInit() {
    this.updateVouchers();
  }

  public updateVouchers() {
    this.updateVouchersTable = true;

    this.voucherService.getVouchers().then((res) => {
      this.updateVouchersTable = false;

      this.vouchers = res;
      this.vouchers.sort((vouchers1, vouchers2) => {
        return (vouchers1.id > vouchers2.id ? 1 : -1);
      });
    }).catch((err) => {
      console.log(err);
      this.updateVouchersTable = false;
    });
  }

  public changeActive(id, activeStatus) {
    let errorState = false;
    let errorText = '';

    const voucherFind = this.vouchers.filter(item => {
      if (item.id === id) {
        item.isProgress = true;
        item.is_active = !item.is_active;
        return item;
      }
    });

    const voucher = {
      usd_amount: voucherFind[0].usd_amount,
      voucher_code: voucherFind[0].voucher_code,
      is_active: voucherFind[0].is_active
    };

    this.voucherService.setVoucher(id, voucher).then((res) => {
      this.acceptTableProgress(id);
    }).catch((err) => {
      console.log(err);
      errorText = err.status + ': ' + err.statusText + ', ' + 'something went wrong, try again';
      errorState = true;
    }).finally(() => {
      this.vouchers.filter((item) => {
        if (item.id === id) {
          if (errorState) {
            item.is_active = activeStatus;
            item.isProgressBtn = true;
            item.progressText = errorText;
          }
        }
      });
    });
  }

  public acceptTableProgress(id) {
    this.vouchers.filter(item => {
      if (item.id === id) {
        item.isProgress = false;
        item.isProgressBtn = false;
        item.progressText = 'in progress, please wait...';
        return item;
      }
    });
  }

  public addVoucher() {
    const voucher = {
      voucher_code: this.voucherCode,
      usd_amount: this.usdAmount,
      is_active: this.isActive,
      lock_days: Number(this.lockDays)
    };

    this.popupInProgressText = 'in progress, please wait...';
    this.pupopInProgress = true;

    this.voucherService.sendVoucher(voucher).then((res) => {
      this.pupopInProgress = false;
      this.close();
      this.vouchers.push(res);
    }).catch(err => {
      console.log('add voucher error: ', err);
      this.popupInProgressBtn = true;
      this.popupInProgressText = err.status + ': ' + err.statusText + '<br><br>' + 'something went wrong, try again';
    });
  }

  public acceptPopupProgress() {
    this.pupopInProgress = false;
    this.popupInProgressBtn = false;
  }

  public close() {
    this.popupAdd = false;
    this.pupopInProgress = false;
    this.activationCode = null;
    this.voucherCode = null;
    this.lockDays = null;
    this.usdAmount = null;
    this.isActive = false;
  }

  public openInfoModal(title?, info?) {
    this.infoModalTitle = title ? title : 'Voucher';
    this.infoModalText = info ? info : 'oops we lost text :(';
    this.popupModal = true;
  }
  public closeInfoModal() {
    this.popupModal = false;
    this.infoModalText = '';
    this.infoModalTitle = 'Voucher';
  }

  public parseCsvFile($event: any) {
    this.loadingCSV = true;
    const file = $event.srcElement.files[0];

    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      worker: true,
      chunk: (chunk) => {
        this.jsonCSV = chunk.data;
      },
      complete: () => {
        console.log('Result: ', this.jsonCSV);
        this.addVouchers(this.jsonCSV);
      },
    });
  }

  public addVouchers(vouchers) {
    vouchers.map(item => {
      item.voucher_code = item.voucher_code.toString();
      item.usd_amount = item.usd_amount.toString();
    });

    this.voucherService.sendVoucher(vouchers).then((res) => {
      console.log(res);
      this.updateVouchers();
      this.loadingCSV = false;
    }).catch(err => {
      console.log('add vouchers error: ', err);
      this.loadingCSV = false;
    });
  }

  public sortVouchers(type) {

    this.sortData[type] && this.changeSort ? this.changeSort = false : this.changeSort = true;
    Object.keys(this.sortData).forEach(v => this.sortData[v] = v === type);

    switch (type) {
      case 'id':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.id > vouchers2.id ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.id < vouchers2.id ? 1 : -1);
          });
        break;
      case 'addDate':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.publish_date)).getDate() >
              (new Date(vouchers2.publish_date)).getDate() ? 1 : -1;
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.publish_date)).getDate() <
              (new Date(vouchers2.publish_date)).getDate() ? 1 : -1;
          });
        break;
      case 'addTime':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.publish_date)).getTime() >
              (new Date(vouchers2.publish_date)).getTime() ? 1 : -1;
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.publish_date)).getTime() <
              (new Date(vouchers2.publish_date)).getTime() ? 1 : -1;
          });
        break;
      case 'usdAmount':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.usd_amount > vouchers2.usd_amount ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.usd_amount < vouchers2.usd_amount ? 1 : -1);
          });
        break;
      case 'freezeDays':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.lock_days > vouchers2.lock_days ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.lock_days < vouchers2.lock_days ? 1 : -1);
          });
        break;
      case 'voucherCode':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.voucher_code > vouchers2.voucher_code ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.voucher_code < vouchers2.voucher_code ? 1 : -1);
          });
        break;
      case 'activateCode':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.activation_code > vouchers2.activation_code ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.activation_code < vouchers2.activation_code ? 1 : -1);
          });
        break;
      case 'active':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.is_active > vouchers2.is_active ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.is_active < vouchers2.is_active ? 1 : -1);
          });
        break;
      case 'used':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.is_used > vouchers2.is_used ? 1 : -1);
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (vouchers1.is_used < vouchers2.is_used ? 1 : -1);
          });
        break;
      case 'activatedDate':
        this.changeSort ?
          this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.activation_date)).getDate() >
              (new Date(vouchers2.activation_date)).getDate() ? 1 : -1;
          })
          : this.vouchers.sort((vouchers1, vouchers2) => {
            return (new Date(vouchers1.activation_date)).getDate() <
              (new Date(vouchers2.activation_date)).getDate() ? 1 : -1;
          });
        break;
      default:
        this.sortVouchers('id');
        break;
    }
  }

  // private makeCode(length) {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;

  //   let result = '';

  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   return result;
  // }

  // public generateCode(type) {
  //   type === 'a' ? this.activationCode = this.makeCode(15) : this.voucherCode = this.makeCode(15);
  // }
}
