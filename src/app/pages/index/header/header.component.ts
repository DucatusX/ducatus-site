import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { hideHeaderInRoutes, adminHeaderInRoutes } from 'src/app/params';

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(document:click)': 'onClick($event)' },
})
export class HeaderComponent implements OnInit {
  public isBrowser: any;

  public openMenu = false;

  public hideHeader = false;
  public adminHeader = false;
  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.hideHeader = !hideHeaderInRoutes.includes(event.url);
        this.adminHeader = !adminHeaderInRoutes.includes(event.url);
      }

      if (event instanceof NavigationError) {
        // console.warn(event.error);
      }
    });
  }

  ngOnInit(): void {
    // scroll menu
    const scrollPosY = window.pageYOffset | document.body.scrollTop;
    const navBar = document.getElementsByClassName('header')[0];

    if (navBar) {
      if (scrollPosY > 100) {
        navBar.classList.add('header-scroll');
      } else if (scrollPosY <= 100) {
        navBar.classList.remove('header-scroll');
      }
    }

    window.onscroll = function changeNav(): void {
      // tslint:disable-next-line: no-shadowed-variable
      const scrollPosY = window.pageYOffset | document.body.scrollTop;
      // tslint:disable-next-line: no-shadowed-variable
      const navBar = document.getElementsByClassName('header')[0];

      if (navBar) {
        if (scrollPosY > 100) {
          navBar.classList.add('header-scroll');
        } else if (scrollPosY <= 100) {
          navBar.classList.remove('header-scroll');
        }
      }
    };
  }

  public logout(): void {
    this.userService.logout().then(() => {
      this.router.navigate(['/admin/login']);
    });
  }
}
