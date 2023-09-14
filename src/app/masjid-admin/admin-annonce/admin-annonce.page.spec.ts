import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAnnoncePage } from './admin-annonce.page';

describe('AdminAnnoncePage', () => {
  let component: AdminAnnoncePage;
  let fixture: ComponentFixture<AdminAnnoncePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
