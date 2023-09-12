import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonsPage } from './dons.page';

describe('DonsPage', () => {
  let component: DonsPage;
  let fixture: ComponentFixture<DonsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
