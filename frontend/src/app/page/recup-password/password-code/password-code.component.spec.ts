import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCodeComponent } from './password-code.component';

describe('PasswordCodeComponent', () => {
  let component: PasswordCodeComponent;
  let fixture: ComponentFixture<PasswordCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
