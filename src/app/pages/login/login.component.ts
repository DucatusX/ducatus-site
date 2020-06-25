import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: HTMLFormElement;

  constructor() { }

  ngOnInit() { }

  onLogin() {
    console.log(this.loginForm);
  }
}
