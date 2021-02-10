import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdateComponent } from './customdate.component';

describe('CustomdateComponent', () => {
  let component: CustomdateComponent;
  let fixture: ComponentFixture<CustomdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
