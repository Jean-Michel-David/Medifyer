import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSearchComponent } from './find-search.component';

describe('FindSearchComponent', () => {
  let component: FindSearchComponent;
  let fixture: ComponentFixture<FindSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
