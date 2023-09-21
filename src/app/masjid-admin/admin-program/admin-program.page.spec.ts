import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProgramPage } from './admin-program.page';

describe('AdminProgramPage', () => {
  let component: AdminProgramPage;
  let fixture: ComponentFixture<AdminProgramPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
