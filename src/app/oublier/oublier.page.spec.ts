import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OublierPage } from './oublier.page';

describe('OublierPage', () => {
  let component: OublierPage;
  let fixture: ComponentFixture<OublierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OublierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
