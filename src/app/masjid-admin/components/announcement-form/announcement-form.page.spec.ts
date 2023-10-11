import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncementFormPage } from './announcement-form.page';

describe('AnnouncementFormPage', () => {
  let component: AnnouncementFormPage;
  let fixture: ComponentFixture<AnnouncementFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnnouncementFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
