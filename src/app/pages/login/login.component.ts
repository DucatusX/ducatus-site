import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/service/user/user.interface';

export interface FormModel {
  captcha?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formIsProgress: boolean;
  public logoutIsProgress: boolean;

  public hasUser: boolean;

  public login = null;
  public password = null;

  public ServerErrors: {
    username?: [string];
    password?: [string];
    totp?: [string];
    non_field_errors?: [string];
  } = {};

  public formModel: FormModel = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userService.getCurrentUser(true, false).subscribe((user: UserInterface) => {
      this.hasUser = !user.is_ghost || false;
    });
  }

  ngOnInit() {
    if (!this.hasUser) {
      this.router.navigate(['/admin/voucher']);
    }
  }

  public sendLoginForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.formIsProgress = true;
    this.userService
      .authenticate(form.value)
      .then(
        (response) => {
          if (response.key) { this.router.navigate(['/admin/voucher']); }
        },
        (error) => {
          switch (error.status) {
            case 403:
              switch (error.error.detail) {
                case '1019':
                  break;
                case '1020':
                  this.ServerErrors = {
                    totp: ['Invalid code'],
                  };
                  break;
              }
              break;
            case 400:
              this.ServerErrors = error.error;
              break;
          }
        }
      )
      .finally(() => {
        this.formIsProgress = false;
      });
  }

  public logout() {
    this.logoutIsProgress = true;

    this.userService.logout().then(() => {
      this.hasUser = false;
    }).finally(() => {
      this.logoutIsProgress = false;
      this.hasUser = false;
    });
  }
}
