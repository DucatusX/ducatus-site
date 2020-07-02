import { Papa } from 'ngx-papaparse';
import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher/voucher.service';
import { IVoucher } from 'src/app/interfaces';

@Component({
  selector: 'app-vaucher',
  templateUrl: './vaucher.component.html',
  styleUrls: ['./vaucher.component.scss']
})

export class VaucherComponent implements OnInit {
  public updateVouchersTable = false;
  public sortById = true;
  public sortByAddDate = false;

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
  // public freezeDate = null;
  public ducAmount = null;
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
    })
  }

  public sortVouchers(type) {
    if (type === 'id') {
      this.sortByAddDate = false;

      this.sortById = !this.sortById;

      this.sortById ?
        this.vouchers.sort((vouchers1, vouchers2) => {
          return (vouchers1.id > vouchers2.id ? 1 : -1);
        })
        : this.vouchers.sort((vouchers1, vouchers2) => {
          return (vouchers1.id < vouchers2.id ? 1 : -1);
        });
    }

    if (type === 'add-date') {
      this.sortById = true;

      this.sortByAddDate = !this.sortByAddDate;

      this.sortByAddDate ?
        this.vouchers.sort((vouchers1, vouchers2) => {
          return (new Date(vouchers1.publish_date)).getDate() >
            (new Date(vouchers2.publish_date)).getDate() ? 1 : -1;
        })
        : this.vouchers.sort((vouchers1, vouchers2) => {
          return (new Date(vouchers1.publish_date)).getDate() <
            (new Date(vouchers2.publish_date)).getDate() ? 1 : -1;
        });
    }
  }

  private makeCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public generateCode(type) {
    type === 'a' ? this.activationCode = this.makeCode(15) : this.voucherCode = this.makeCode(15);
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
      duc_amount: voucherFind[0].duc_amount,
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
      duc_amount: this.ducAmount,
      is_active: this.isActive
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
    // this.freezeDate = null;
    this.ducAmount = null;
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
      item.duc_amount = item.duc_amount.toString();
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
}
