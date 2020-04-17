import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: { '(document:click)': 'onClick($event)' }
})
export class HeaderComponent implements OnInit {

  public isBrowser: any;
  public openedLngList = false;
  private translator: TranslateService;
  public languagesList: { lng: string; title: string; active?: boolean }[];
  public currLanguage: string;

  public openMenu = false;


  constructor(translate: TranslateService) {

    this.translator = translate;
    this.languagesList = [
      {
        lng: 'en',
        title: 'Eng',
        active: true,
      },
      {
        lng: 'it',
        title: 'It',
        active: false,
      },
      {
        lng: 'vie',
        title: 'Vie',
        active: false,
      },
      {
        lng: 'deu',
        title: 'Deu',
        active: false,
      },
    ];

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setActiveLanguage(event);
    });

    this.setActiveLanguage({
      lang: translate.currentLang,
    });

  }

  private onClick($event) {
    if ($($event.target).closest('.header-menu-toggle-block').length === 0) {
      if ($($event.target).closest('.select-coin-list-item').length === 0) {
        this.openMenu = false;
      }
    }
    if ($($event.target).closest('.language-select').length === 0) {
      this.openedLngList = false;
    }
  }

  private setActiveLanguage(event) {
    if (this.currLanguage) {
      this.languagesList.map((lang) => {
        if (lang['lng'] === this.currLanguage) { lang['active'] = true; }
        else { lang['active'] = false; }
        // return lang['lng'] === this.currLanguage;
      });
    }
    this.currLanguage = event.lang;
    window['jQuery']['cookie']('lng', this.currLanguage);

    this.languagesList.map((lang) => {
      if (lang['lng'] === this.currLanguage) { lang['active'] = true; }
      else { lang['active'] = false; }
      // return lang['lng'] === this.currLanguage;
    });
    this.languagesList.sort((a, b) => {
      return b.active ? 1 : -1;
    });
  }

  public toggleLanguage() {
    this.openedLngList = !this.openedLngList;
  }

  public setLanguage(lng) {
    this.translator.use(lng);
  }

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
