import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesRecherchesComponent } from './mes-recherches.component';

describe('MesRecherchesComponent', () => {
  let component: MesRecherchesComponent;
  let fixture: ComponentFixture<MesRecherchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesRecherchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesRecherchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
