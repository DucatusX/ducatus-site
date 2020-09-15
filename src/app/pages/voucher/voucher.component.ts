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
    publish_date: false,
    publish_date_time: false,
    voucher_code: false,
    activation_code: false,
    usd_amount: false,
    is_active: false,
    is_used: false,
    lock_days: false,
    activation_date: false
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
  ) { }

  ngOnInit() {
    this.updateVouchers();
  }

  public updateVouchers() {
    this.updateVouchersTable = true;

    this.voucherService.getVouchers()
      .then((res) => {
        this.vouchers = res;
        this.changeSort = false;
        this.sortVouchers('id');
      })
      .catch((err) => { console.log(err); })
      .finally(() => this.updateVouchersTable = false);
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

  public acceptTableProgress(id: any) {
    this.vouchers.filter(item => {
      if (item.id === id) {
        item.isProgress = item.isProgressBtn = false;
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
    this.pupopInProgress = this.popupInProgressBtn = false;
  }

  public close() {
    this.popupAdd = this.isActive = this.pupopInProgress = false;
    this.activationCode = this.voucherCode = this.lockDays = this.usdAmount = null;
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
      this.updateVouchers();
      this.loadingCSV = false;
    }).catch(err => {
      console.log('add vouchers error: ', err);
      this.loadingCSV = false;
    });
  }

  public sortVouchers(type: string, tdate?: string) {
    this.sortData[type] && this.changeSort ? this.changeSort = false : this.changeSort = true;
    Object.keys(this.sortData).forEach(v => this.sortData[v] = v === type);

    this.vouchers.sort((vouchers1, vouchers2) => {

      let sortVoucher1: any;
      let sortVoucher2: any;

      if (tdate) {
        sortVoucher1 = tdate === 'date' ? new Date(vouchers1[type]).getDate() : new Date(vouchers1[type]).getTime();
        sortVoucher2 = tdate === 'date' ? new Date(vouchers2[type]).getDate() : new Date(vouchers2[type]).getTime();
      } else {
        sortVoucher1 = vouchers1[type];
        sortVoucher2 = vouchers2[type];
      }

      if (this.changeSort) {
        return sortVoucher1 > sortVoucher2 ? 1 : -1;
      } else {
        return sortVoucher1 < sortVoucher2 ? 1 : -1;
      }
    });
  }
}
