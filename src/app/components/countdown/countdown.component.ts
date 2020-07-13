import { Component, OnInit, Input, OnDestroy, ValueProvider } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})

export class CountdownComponent implements OnInit {

  @Input() timeStart: number;
  @Input() correctTimeStart: number;
  @Input() timeEndDayPlus: number;

  private counter$: Observable<number>;
  private subscription: Subscription;
  public message: string;

  constructor(

  ) { }

  dhms(t) {
    let days: string | number, hours: string | number, minutes: string | number, seconds: string | number;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + ':',
      hours + ':',
      minutes + ':',
      seconds
    ].join('');
  }


  ngOnInit() {
    if (this.correctTimeStart) { this.timeStart = this.timeStart * 1000; }

    const future = new Date(this.timeStart);
    future.setDate(future.getDate() + this.timeEndDayPlus);
    this.counter$ = interval(1000).pipe(map(() => Math.floor((future.getTime() - new Date().getTime()) / 1000)));
    this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
  }

  OnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
