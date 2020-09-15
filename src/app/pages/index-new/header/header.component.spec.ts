/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderNewComponent } from './header-new.component';

describe('HeaderComponent', () => {
  let component: HeaderNewComponent;
  let fixture: ComponentFixture<HeaderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
