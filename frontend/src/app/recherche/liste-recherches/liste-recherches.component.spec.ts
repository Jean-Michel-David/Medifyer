import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecherchesComponent } from './liste-recherches.component';

describe('ListeRecherchesComponent', () => {
  let component: ListeRecherchesComponent;
  let fixture: ComponentFixture<ListeRecherchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRecherchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRecherchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
