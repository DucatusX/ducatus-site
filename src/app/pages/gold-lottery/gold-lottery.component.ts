import { Component, OnInit, ViewChild } from '@angular/core';
import { GoldLotteryService } from '../../service/gold-lottery/gold-lottery.service';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-gold-lottery',
  templateUrl: './gold-lottery.component.html',
  styleUrls: ['./gold-lottery.component.scss']
})
export class GoldLotteryComponent implements OnInit {

  public formData: any;
  public formDataCheck: any;
  public win = false;
  public winData: any;
  public ducPrice: any;

  public type = 'registration';
  public registrationStep = 0;

  constructor(private goldlotteryservice: GoldLotteryService, private route: ActivatedRoute) {
    this.formData = {
      code: '',
      validCode: false,
      typeCode: false,
      addressDuc: '',
      validateDuc: false,
      typeDuc: false,
      validDuc: false,
      finalValidDuc: false,
      addressDucx: '',
      validDucx: false,
      typeDucx: false,
      button: true,
      formValidating: false
    };

    this.formDataCheck = {
      // precode: '',
      // validPreCode: false,
      code: '',
      valid: false,
      validating: false,
      validCode: false,
      typeCode: false,
      button: true,
      validRegistrate: false
    };
  }

  @ViewChild('registrationForm') registrationForm: HTMLFormElement;
  @ViewChild('checkForm') checkForm: HTMLFormElement;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['t'] === 'reqistration') this.type = 'registration';
      if (params['t'] === 'check') this.type = 'check';
    });

  }

  public registrate(form) {
    this.registrationStep = 1;
  }

  public changeForm(typeForm) {
    this.type = typeForm;
    this.formData = {
      code: '',
      validCodeRegistrated: false,
      validCode: false,
      typeCode: false,
      addressDuc: '',
      validateDuc: false,
      typeDuc: false,
      validDuc: false,
      finalValidDuc: false,
      addressDucx: '',
      validDucx: false,
      typeDucx: false,
      button: true,
      formValidating: false
    };

    this.formDataCheck = {
      // precode: '',
      // validPreCode: false,
      code: '',
      valid: false,
      validating: false,
      typeCode: false,
      button: true,
      validRegistrate: false
    };
  }

  private format(input, format, sep) {
    let output = '';
    let idx = 0;
    for (let i = 0; i < format.length && idx < input.length; i++) {
      output += input.substr(idx, format[i]);
      if (idx + format[i] < input.length) { output += sep; }
      idx += format[i];
    }

    output += input.substr(idx);

    return output;
  }

  public formValidate(addressType: string) {

    switch (addressType) {
      case 'DUC':
        this.formData.typeDuc = true;
        this.formData.addressDuc = this.formData.addressDuc.replace('ducatus:', '');

        if (this.formData.addressDuc.length === 34 && ['L', 'l', 'M', 'm'].includes(this.formData.addressDuc.substring(0, 1))) {

          this.formData.validateDuc = true;
          this.formData.validDuc = false;

          this.goldlotteryservice.getValidateDucatusAddress(this.formData.addressDuc).then((result) => {
            if (result.address_valid === true) { this.formData.validDuc = false; this.formData.finalValidDuc = false; }
            else { this.formData.validDuc = true; this.formData.finalValidDuc = true; }
            this.formData.validateDuc = false;
            this.checkRegistrateForm();
          }).catch(err => { console.log('something went wrong...', err); this.formData.finalValidDuc = false; this.formData.validDuc = true; this.formData.validateDuc = false; this.checkRegistrateForm(); });

        } else {
          this.formData.validDuc = true;
          this.formData.finalValidDuc = true;
        }
        break;

      case 'DUCX':

        this.formData.typeDucx = true;
        if (this.formData.addressDucx.length === 42) {

          const reg = /0x[0-9a-fA-F]{40}/;
          const inputstr = this.formData.addressDucx;


          if (!reg.test(inputstr)) { this.formData.validDuc = true; return; }
          if (($.trim(inputstr) === '') || ($.trim(inputstr).length < 15)) { this.formData.validDucx = true; }
          else { this.formData.validDucx = false; }

        } else { this.formData.validDucx = true; }
        break;

      case 'CODE':

        this.formData.typeCode = true;
        let foo = this.registrationForm.controls.code.value.replace(/-/g, '');

        if (foo.length > 0) {
          foo = this.format(foo, [4, 4, 4, 4, 4, 4, 4, 4], '-');
        }

        this.formData.code = foo;
        this.formData.validCodeRegistrated = false;

        if (this.formData.code.length !== 39) {
          this.formData.validCode = true;
        } else { this.formData.validCode = false; }

        break;
    }

    this.checkRegistrateForm();
  }

  private checkRegistrateForm() {
    if (!this.formData.finalValidDuc && this.formData.typeDuc && !this.formData.validDucx && this.formData.typeDucx && !this.formData.validCode && this.formData.typeCode) {
      this.formData.button = false;
    }
    else { this.formData.button = true; }
  }

  public confirmRegistration() {
    this.formData.formValidating = true;

    this.goldlotteryservice.codeRegistrate(this.formData.addressDuc, this.formData.addressDucx, new UpperCasePipe().transform(this.formData.code)).then((result) => {
      if (result.token_id) {
        this.ducPrice = result.token_type * result.gold_price * result.duc_value / result.duc_count;
        this.winData = result;
        this.win = true;
        this.formData.formValidating = false;
      }

    }).catch((err) => {
      let words: string;

      if (err.error.detail) {
        words = this.wordsReturn(err.error.detail, 2);

        if (words === 'NaNregisteredalready') {
          this.formData.validCodeRegistrated = true;
          this.formData.validCode = true;
          this.formDataCheck.button = true;
        }

        if (words === 'NaNexistnot') {
          this.formData.validCode = true;
          this.formDataCheck.button = true;
        }
      }

      this.formData.formValidating = false;
      this.winData = [];
    });
  }

  public wordsReturn(words, count) {
    let word: string;
    const n = words.split(' ');
    for (let index = 0; index <= count; index++) {
      word += n[n.length - index];
    }
    return word;
  }

  public confirmCheck() {
    // const publicCode = this.formDataCheck.precode + '-' + this.formDataCheck.code;

    this.goldlotteryservice.codeCheck(new UpperCasePipe().transform(this.formDataCheck.code)).then((result) => {
      if (result.token_id) {
        this.ducPrice = result.token_type * result.gold_price * result.duc_value / result.duc_count;
        this.winData = result;
        this.win = true;
        this.formData.formValidating = false;
      }

      if (result.token_id === null && result.token_type != "") {
        this.formDataCheck.validRegistrate = true;
        // this.formDataCheck.validPreCode = true;
        this.formDataCheck.validCode = true;
        this.formDataCheck.button = true;
      }

    }).catch((err) => {
      let words: string;

      if (err.error.detail) {
        words = this.wordsReturn(err.error.detail, 2);

        if (words === 'NaNexistnot') {
          // this.formDataCheck.validPreCode = true;
          this.formDataCheck.validCode = true;
          this.formDataCheck.button = true;
        }
      }

      // this.formDataCheck.validPreCode = true;
      this.formDataCheck.validCode = true;
      this.formDataCheck.button = true;
    });
  }

  // public formPreCodeValidate() {

  //   this.formDataCheck.validRegistrate = false;

  //   if (this.formDataCheck.precode.length !== 4) {
  //     this.formDataCheck.validPreCode = true;
  //     this.formDataCheck.button = true;
  //   } else {
  //     this.formDataCheck.validPreCode = false;
  //     if (this.formDataCheck.code.length === 34) {
  //       this.formDataCheck.button = false;
  //     }
  //   }

  //   if (this.formDataCheck.code.length !== 34) {
  //     this.formDataCheck.validCode = true;
  //   } else { this.formDataCheck.validCode = false; }
  // }

  public formCodeValidate() {

    this.formDataCheck.validRegistrate = false;

    this.formDataCheck.typeCode = true;
    let foo = this.formDataCheck.code.replace(/-/g, '');

    if (foo.length > 0) {
      foo = this.format(foo, [4, 4, 4, 4, 4, 4, 4, 4], '-');
    }

    this.formDataCheck.code = foo;

    // if ((this.formDataCheck.precode.length === 4) && (this.formDataCheck.code.length === 34)) { this.formDataCheck.button = false; }
    // else { this.formDataCheck.button = true; }

    // if (this.formDataCheck.precode.length !== 4) {
    //   this.formDataCheck.validPreCode = true;
    // } else { this.formDataCheck.validPreCode = false; }

    if (this.formDataCheck.code.length !== 39) {
      this.formDataCheck.validCode = true;
      this.formDataCheck.button = true;
    } else { this.formDataCheck.validCode = false; this.formDataCheck.button = false; }

  }

}
