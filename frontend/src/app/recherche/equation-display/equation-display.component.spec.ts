import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationDisplayComponent } from './equation-display.component';

describe('EquationDisplayComponent', () => {
  let component: EquationDisplayComponent;
  let fixture: ComponentFixture<EquationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquationDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
