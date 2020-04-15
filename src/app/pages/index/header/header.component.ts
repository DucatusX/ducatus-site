import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public openMenu: Boolean = false;

  ngOnInit() {

    // scroll menu
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    var navBar = document.getElementsByClassName('header')[0];

    if (scrollPosY > 100) {
      navBar.classList.add('header-scroll');
    } else if (scrollPosY <= 100) {
      navBar.classList.remove('header-scroll');
    }

    window.onscroll = function changeNav() {
      var scrollPosY = window.pageYOffset | document.body.scrollTop;
      var navBar = document.getElementsByClassName('header')[0];

      if (scrollPosY > 100) {
        navBar.classList.add('header-scroll');
      } else if (scrollPosY <= 100) {
        navBar.classList.remove('header-scroll');
      }
    };

  }

}
