import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleRechercheComponent } from './nouvelle-recherche.component';

describe('NouvelleRechercheComponent', () => {
  let component: NouvelleRechercheComponent;
  let fixture: ComponentFixture<NouvelleRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvelleRechercheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvelleRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
