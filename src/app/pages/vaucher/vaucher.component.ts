import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-vaucher',
  templateUrl: './vaucher.component.html',
  styleUrls: ['./vaucher.component.scss']
})
export class VaucherComponent implements OnInit {
  @ViewChild('loginForm') loginForm: HTMLFormElement;

  public user = true;

  constructor() { }

  ngOnInit() { }
}
