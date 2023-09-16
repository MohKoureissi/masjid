import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MosqueFormPage } from './mosque-form.page';

describe('MosqueFormPage', () => {
  let component: MosqueFormPage;
  let fixture: ComponentFixture<MosqueFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MosqueFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
