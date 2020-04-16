import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService) {

    const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];
    const langToSet = window['jQuery']['cookie']('lng') || (['en', 'vie', 'it'].includes(defaultLng) ? defaultLng : 'en');

    this.translateService.use(langToSet);
  }


  ngOnInit(): void {
    // this.translateService.use('en');
  }

}

