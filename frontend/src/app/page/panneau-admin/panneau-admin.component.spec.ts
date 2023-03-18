import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneauAdminComponent } from './panneau-admin.component';

describe('PanneauAdminComponent', () => {
  let component: PanneauAdminComponent;
  let fixture: ComponentFixture<PanneauAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanneauAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanneauAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
