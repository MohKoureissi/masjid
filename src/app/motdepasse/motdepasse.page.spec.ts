import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotdepassePage } from './motdepasse.page';

describe('MotdepassePage', () => {
  let component: MotdepassePage;
  let fixture: ComponentFixture<MotdepassePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MotdepassePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
