import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionMosqueePage } from './gestion-mosquee.page';

describe('GestionMosqueePage', () => {
  let component: GestionMosqueePage;
  let fixture: ComponentFixture<GestionMosqueePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestionMosqueePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
