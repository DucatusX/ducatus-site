/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterNewComponent } from './footer-new.component';

describe('FooterComponent', () => {
  let component: FooterNewComponent;
  let fixture: ComponentFixture<FooterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
