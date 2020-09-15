/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IndexNewComponent } from './index-new.component';

describe('IndexComponent', () => {
  let component: IndexNewComponent;
  let fixture: ComponentFixture<IndexNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
