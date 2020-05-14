/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DucatusxComponent } from './ducatusx.component';

describe('DucatusxComponent', () => {
  let component: DucatusxComponent;
  let fixture: ComponentFixture<DucatusxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DucatusxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DucatusxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
