import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProgramListPage } from './admin-program-list.page';

describe('AdminProgramListPage', () => {
  let component: AdminProgramListPage;
  let fixture: ComponentFixture<AdminProgramListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminProgramListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
