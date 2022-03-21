import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpSimpleComponent } from './http-simple.component';

describe('HttpSimpleComponent', () => {
  let component: HttpSimpleComponent;
  let fixture: ComponentFixture<HttpSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
