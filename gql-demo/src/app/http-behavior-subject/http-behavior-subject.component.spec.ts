import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpBehaviorSubjectComponent } from './http-behavior-subject.component';

describe('HttpBehaviorSubjectComponent', () => {
  let component: HttpBehaviorSubjectComponent;
  let fixture: ComponentFixture<HttpBehaviorSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpBehaviorSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpBehaviorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
