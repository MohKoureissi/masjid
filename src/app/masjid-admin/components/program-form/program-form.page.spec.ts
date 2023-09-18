import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramFormPage } from './program-form.page';

describe('ProgramFormPage', () => {
  let component: ProgramFormPage;
  let fixture: ComponentFixture<ProgramFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgramFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
