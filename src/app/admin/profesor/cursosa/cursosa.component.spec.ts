import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosaComponent } from './cursosa.component';

describe('CursosaComponent', () => {
  let component: CursosaComponent;
  let fixture: ComponentFixture<CursosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
