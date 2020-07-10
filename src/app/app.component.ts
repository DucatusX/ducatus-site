import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterOutlet
} from '@angular/router';
import { slider } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider]
})
export class AppComponent implements OnInit {

  public showOverlay = true;

  constructor(private translateService: TranslateService, private router: Router) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];
    const langToSet = window['jQuery']['cookie']('lng') || (['deu', 'eng', 'vie', 'ita'].includes(defaultLng) ? defaultLng : 'eng');

    this.translateService.use(langToSet);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  ngOnInit(): void { }
}
