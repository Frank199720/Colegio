import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarpComponent } from './sidebarp.component';

describe('SidebarpComponent', () => {
  let component: SidebarpComponent;
  let fixture: ComponentFixture<SidebarpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
