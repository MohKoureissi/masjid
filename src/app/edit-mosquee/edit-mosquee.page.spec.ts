import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMosqueePage } from './edit-mosquee.page';

describe('EditMosqueePage', () => {
  let component: EditMosqueePage;
  let fixture: ComponentFixture<EditMosqueePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditMosqueePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
