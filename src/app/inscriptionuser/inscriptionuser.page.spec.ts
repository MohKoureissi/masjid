import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionuserPage } from './inscriptionuser.page';

describe('InscriptionuserPage', () => {
  let component: InscriptionuserPage;
  let fixture: ComponentFixture<InscriptionuserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscriptionuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
