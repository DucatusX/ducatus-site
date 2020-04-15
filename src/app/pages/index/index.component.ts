import { Component, OnInit, OnDestroy } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {


  constructor() { }

  public mySwiper;

  ngOnInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  ngOnDestroy() {
    this.mySwiper = undefined;
  }

}
