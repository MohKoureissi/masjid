import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfosHorairesPage } from './infos-horaires.page';

describe('InfosHorairesPage', () => {
  let component: InfosHorairesPage;
  let fixture: ComponentFixture<InfosHorairesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfosHorairesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
