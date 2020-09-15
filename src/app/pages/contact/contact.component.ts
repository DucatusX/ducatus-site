import { Component, OnInit } from '@angular/core';
import { SendService } from '../../service/send/send.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public formData: any;
  public contactMainSend = 0;
  public disableFields = false;

  constructor(private sendservice: SendService) {
    this.formData = {
      name: '',
      tel: '',
      email: '',
      message: ''
    };
  }

  public sendMail() {
    this.disableFields = true;

    this.sendservice.sendContactMessage(this.formData).then((result) => {
      this.contactMainSend = 1;
      this.disableFields = false;
    }).catch((err) => {
      console.log('Erorr', err);
      this.disableFields = false;
      this.contactMainSend = 2;
    });
  }

  ngOnInit() {
  }

}
