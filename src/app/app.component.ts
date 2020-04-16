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
    console.log('LANG defaultLng', defaultLng);
    console.log('LANG defaultLng cookie', window['jQuery']['cookie']('lng'));

    const langToSet = window['jQuery']['cookie']('lng') || (['en', 'vie', 'it'].includes(defaultLng) ? defaultLng : 'en');
    console.log('LANG langToSet', langToSet);

    this.translateService.use(langToSet);
  }


  ngOnInit(): void {
    // this.translateService.use('en');
  }

}

