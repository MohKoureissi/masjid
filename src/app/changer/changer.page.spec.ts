import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangerPage } from './changer.page';

describe('ChangerPage', () => {
  let component: ChangerPage;
  let fixture: ComponentFixture<ChangerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
