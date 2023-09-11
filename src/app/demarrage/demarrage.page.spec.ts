import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemarragePage } from './demarrage.page';

describe('DemarragePage', () => {
  let component: DemarragePage;
  let fixture: ComponentFixture<DemarragePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DemarragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
