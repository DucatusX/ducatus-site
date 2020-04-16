import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public privacyCookie = true;

  constructor() { }

  public privacyCookieSet() {
    window['jQuery']['cookie']('privacyCookie', true);
    this.privacyCookie = false;
  }

  ngOnInit() {

    if (window['jQuery']['cookie']('privacyCookie')) {
      this.privacyCookie = false;
    }

    const bottomMenu = document.getElementsByClassName('footer-menu');
    for (let i = 0; i < bottomMenu.length; i++) {
      bottomMenu[i].addEventListener('click', function () {
        if ($(this).hasClass('footer-menu')) {
          if ($(this).parent().hasClass('footer-menu-same') && !$(this).parent().hasClass('footer-menu-same-open')) {
            $(this).parent().addClass('footer-menu-same-open');
            return;
          } else if ($(this).parent().hasClass('footer-menu-same') && $(this).parent().hasClass('footer-menu-same-open')) {
            $(this).parent().removeClass('footer-menu-same-open');
            return;
          }
          if ($(this).hasClass('footer-menu-open')) {
            $(this).removeClass('footer-menu-open');
          } else {
            $(this).addClass('footer-menu-open');
          }
        }
      });
    };

  }

}
