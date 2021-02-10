import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasGenComponent } from './notas-gen.component';

describe('NotasGenComponent', () => {
  let component: NotasGenComponent;
  let fixture: ComponentFixture<NotasGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
