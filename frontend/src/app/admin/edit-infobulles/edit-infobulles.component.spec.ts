import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfobullesComponent } from './edit-infobulles.component';

describe('EditInfobullesComponent', () => {
  let component: EditInfobullesComponent;
  let fixture: ComponentFixture<EditInfobullesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfobullesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfobullesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
