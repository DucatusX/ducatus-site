import { UserService } from 'src/app/service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { hideHeaderInRoutes, adminHeaderInRoutes } from 'src/app/params';

import * as $ from 'jquery';

@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.scss'],
})
export class HeaderNewComponent implements OnInit {
  public isBrowser: any;

  public openMenu = false;

  public hideHeader = false;
  public adminHeader = false;
  public buyHeader = false;

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.hideHeader = !hideHeaderInRoutes.includes(event.url);
        this.buyHeader = event.url.startsWith('/buy');
        this.adminHeader = !adminHeaderInRoutes.includes(event.url);
      }

      if (event instanceof NavigationError) {
        // console.warn(event.error);
      }
    });
  }

  // private onClick($event): void {
  //   if ($($event.target).closest('.header-menu-toggle-block').length === 0) {
  //     if ($($event.target).closest('.select-coin-list-item').length === 0) {
  //       this.openMenu = false;
  //     }
  //   }
  // }

  public changeMenu(): void {
    this.openMenu = !this.openMenu;
    console.log('openMenu', this.openMenu);
    if(this.openMenu){
      document.body.style.overflowY ='hidden'
    }
    else{
      document.body.style.overflowY ='visible'
    }
  }

  public closeMenu(): void {
    this.openMenu = false
  }

  ngOnInit(): void {
    // scroll menu
    const scrollPosY = window.pageYOffset | document.body.scrollTop;
    const navBar = document.getElementsByClassName('header')[0];

    if (scrollPosY > 100) {
      navBar.classList.add('header-scroll');
    } else if (scrollPosY <= 100) {
      navBar.classList.remove('header-scroll');
    }

    window.onscroll = function changeNav(): void {
      // tslint:disable-next-line: no-shadowed-variable
      const scrollPosY = window.pageYOffset | document.body.scrollTop;
      // tslint:disable-next-line: no-shadowed-variable
      const navBar = document.getElementsByClassName('header')[0];

      if (scrollPosY > 100) {
        navBar.classList.add('header-scroll');
      } else if (scrollPosY <= 100) {
        navBar.classList.remove('header-scroll');
      }
    };
  }

  public logout(): void {
    this.userService.logout().then(() => {
      this.router.navigate(['/admin/login']);
    });
  }
}
