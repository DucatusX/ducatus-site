import { Injectable } from '@angular/core';

declare let gtag;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  public eventEmitter(eventName: string, eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null): void {
    gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue,
    });
  }
}
