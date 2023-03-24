import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauvegarderComponent } from './sauvegarder.component';

describe('SauvegarderComponent', () => {
  let component: SauvegarderComponent;
  let fixture: ComponentFixture<SauvegarderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauvegarderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SauvegarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
