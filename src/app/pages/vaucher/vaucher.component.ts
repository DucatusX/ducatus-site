import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-vaucher',
  templateUrl: './vaucher.component.html',
  styleUrls: ['./vaucher.component.scss']
})
export class VaucherComponent implements OnInit {
  @ViewChild('loginForm') loginForm: HTMLFormElement;

  public user = true;
  public popupAdd = false;

  public cvsFile: any;
  public loadingCSV = false;
  private jsonCSV: any;

  public activationCode = null;
  public voucherCode = null;
  public freezeDate = null;
  public amount = null;
  public statusVoucher = false;

  public vouchers = [
    { id: 10, add_date: '22.06.2020', add_time: '12:35', code: '123456789123456789', activation_code: 'asdqwecxz', amount: 25, active: true, status: false },
    { id: 11, add_date: '23.06.2020', add_time: '13:46', code: '987654321987654321', activation_code: 'dasdasdas', amount: 36.9, active: false, status: true },
    { id: 12, add_date: '24.06.2020', add_time: '14:57', code: '091287347091287347', activation_code: 'wedasersa', amount: 47.34, active: true, status: false },
    { id: 13, add_date: '25.06.2020', add_time: '15:08', code: '102938475102938475', activation_code: 'dxzgt2das', amount: 58.132, active: true, status: false },
    { id: 14, add_date: '26.06.2020', add_time: '16:19', code: '758493021758493021', activation_code: 'oiuygvbas', amount: 69.11, active: false, status: false },
    { id: 15, add_date: '27.06.2020', add_time: '17:20', code: '654890326654890326', activation_code: '34asdwe13', amount: 70.00008, active: true, status: true },
    { id: 16, add_date: '28.06.2020', add_time: '18:31', code: '456783221456783221', activation_code: '7eqw7sa5w', amount: 81.1112, active: true, status: true },
    { id: 17, add_date: '29.06.2020', add_time: '19:42', code: '993411245993411245', activation_code: 'dasd9awed', amount: 92.33337, active: true, status: false },
    { id: 18, add_date: '30.06.2020', add_time: '20:53', code: '198762345198762345', activation_code: 'dsd5weas8', amount: 13.334444, active: false, status: true },
    { id: 19, add_date: '31.06.2020', add_time: '21:04', code: '234271235234271235', activation_code: 'dasd5weas', amount: 24.987654, active: true, status: false },
    { id: 20, add_date: '01.07.2020', add_time: '22:15', code: '536475869536475869', activation_code: 'poiuytgfv', amount: 35.1234567, active: false, status: true }
  ];

  constructor(
    private papa: Papa
  ) { }

  ngOnInit() { }

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

  public submit(form: NgForm) {
    console.log(form, form.controls.amount.value);
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
        this.loadingCSV = false;
        this.jsonCSV = chunk.data;
      },
      complete: () => {
        console.log('Result: ', this.jsonCSV);
      },
    });
  }
}
