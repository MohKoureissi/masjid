import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrechePage } from './preche.page';

describe('PrechePage', () => {
  let component: PrechePage;
  let fixture: ComponentFixture<PrechePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
