import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfosComponent } from './edit-infos.component';

describe('EditInfosComponent', () => {
  let component: EditInfosComponent;
  let fixture: ComponentFixture<EditInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
