import { Component } from '@angular/core';

@Component({
  selector: 'app-index-new',
  templateUrl: './index-new.component.html',
  styleUrls: ['./index-new.component.scss'],
})
export class IndexNewComponent {
  public mySwiper;
  public lang = 'eng';
  isClosedQuestion = false

  closeQuestion():void{
    this.isClosedQuestion = true
    console.log('lol')
  }


  public header = {
    eng: {
      title: 'Designed for Usability.',
      text: 'At Ducatus, our vision is to create user-oriented blockchains that offer transparency and accessibility to every type of user.',
      button: 'Download Whitepaper',
      image: 'slide-1.png',
      file: 'ducatus-coin-white-paper.pdf',
    },
  };

  public FAQ = [
    {
      isOpened: false,
    },
    {
      isOpened: false,
    },
    {
      isOpened: false,
    },
    {
      isOpened: false,
    },
    {
      isOpened: false,
    },
  ];

  constructor() {
  }
}
