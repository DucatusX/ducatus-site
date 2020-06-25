/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VaucherComponent } from './vaucher.component';

describe('VaucherComponent', () => {
  let component: VaucherComponent;
  let fixture: ComponentFixture<VaucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VaucherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
